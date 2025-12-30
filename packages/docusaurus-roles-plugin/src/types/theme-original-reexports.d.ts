// Re-export the *typed* theme modules so wrappers can import @theme-original/*
// and still use the Props types from @theme/*.

declare module "@theme-init/BlogListPage" {
  export { default } from "@theme/BlogListPage";
  export * from "@theme/BlogListPage";
}

declare module "@theme-init/BlogPostPage" {
  export { default } from "@theme/BlogPostPage";
  export * from "@theme/BlogPostPage";
}

declare module "@theme-init/BlogSidebar" {
  export { default } from "@theme/BlogSidebar";
  export * from "@theme/BlogSidebar";
}

declare module "@theme-init/BlogPostItem" {
  export { default } from "@theme/BlogPostItem";
  export * from "@theme/BlogPostItem";
}

declare module "@theme-init/DocItem" {
  export { default } from "@theme/DocItem";
  export * from "@theme/DocItem";
}

declare module "@theme-init/DocSidebar" {
  export { default } from "@theme/DocSidebar";
  export * from "@theme/DocSidebar";
}

declare module "@theme-init/NavbarItem" {
  export { default } from "@theme/NavbarItem";
  export * from "@theme/NavbarItem";
}

declare module "@theme-init/NavbarItem/NavbarNavLink" {
  export { default } from "@theme/NavbarItem/NavbarNavLink";
  export * from "@theme/NavbarItem/NavbarNavLink";
}

declare module "@theme-init/Footer/Links" {
  export { default } from "@theme/Footer/Links";
  export * from "@theme/Footer/Links";
}
