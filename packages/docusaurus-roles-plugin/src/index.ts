import path from "path";
import type { LoadContext, Plugin } from "@docusaurus/types";
import {
  type RolesPluginOptions,
  type RoleEntry,
  transformRoleFrontMatterToRoleRequirements,
} from "./options";
import { BlogPost, ProcessBlogPostsFn } from "@docusaurus/plugin-content-blog";
import {
  SidebarItemsGeneratorDoc,
  SidebarItemsGeneratorOption,
} from "@docusaurus/plugin-content-docs/src/sidebars/types.js";

export { type RolesPluginOptions } from "./options";

/**
 * Used to apply FrontMatter required_roles and required_roles_mode to
 * sidebar_custom_props.required_roles and sidebar_custom_props.required_roles_mode.
 *
 * Should use protectDocSidebar for simple use cases.
 *
 * @param docs - The docs to transform.
 */
export const addDocSidebarCustomProps = (docs: SidebarItemsGeneratorDoc[]) => {
  for (const doc of docs) {
    const roles = doc.frontMatter.required_roles;
    if (!roles) continue;

    const props = (doc.frontMatter.sidebar_custom_props ??= {});
    props.required_roles = roles;
    props.required_roles_mode = doc.frontMatter.required_roles_mode;
  }
};

/**
 * Used to protect docs sidebar is a plug and play for sidebarItemsGenerator
 */
export const protectDocSidebar: SidebarItemsGeneratorOption = async ({
  defaultSidebarItemsGenerator,
  ...args
}) => {
  addDocSidebarCustomProps(args.docs);

  return defaultSidebarItemsGenerator(args);
};

let rolesByPermalink: RoleEntry[] = [];

function createDeferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T | "timeout"> {
  return Promise.race([
    p,
    new Promise<"timeout">((res) => setTimeout(() => res("timeout"), ms)),
  ]);
}

let blogRolesReady = createDeferred<void>();

/**
 * Used to set rolesByPermalink which is used by overriden BlogSidebar
 * to protect blog sidebar.
 */
export const setRolesByPermaLink = (blogPosts: BlogPost[]) => {
  blogRolesReady = createDeferred<void>();

  rolesByPermalink = blogPosts.map((bp) => ({
    permalink: bp.metadata.permalink,
    ...transformRoleFrontMatterToRoleRequirements(bp.metadata.frontMatter),
  }));

  blogRolesReady.resolve();
};

/**
 * Used to protect blog sidebar is a plug and play for processBlogPosts.
 */
export const protectBlogSidebar: ProcessBlogPostsFn = async ({ blogPosts }) => {
  setRolesByPermaLink(blogPosts);
  return blogPosts;
};

export default function pluginRoles(
  _context: LoadContext,
  options: RolesPluginOptions,
): Plugin {
  return {
    name: "docusaurus-roles-plugin",

    getThemePath() {
      return path.resolve(__dirname, "./theme");
    },

    getTypeScriptThemePath() {
      return path.resolve(__dirname, "../src/theme");
    },

    async contentLoaded({ actions }) {
      await withTimeout(blogRolesReady.promise, 5000);

      actions.setGlobalData({
        rolesByPermalink,
        unauthorizedBehavior: options.unauthorizedBehavior ?? "notFound",
        redirectTo: options.redirectTo ?? "/access-denied",
      });
    },
  };
}
