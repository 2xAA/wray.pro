exports.linkResolver = (doc) => {
  // URL for a category type
  if (doc.type === "work") {
    return `/work/${doc.uid}`;
  }

  // URL for a page type
  if (doc.type === "page") {
    return `/${doc.uid}`;
  }

  if (doc.type === "blog_post") {
    return `/blog/${doc.uid}`;
  }

  if (doc.type === "blog_home") {
    return `/blog/`;
  }

  if (doc.type === "home") {
    return `/`;
  }

  if (doc.type === "about") {
    return `/about`;
  }

  // Backup for all other types
  return "/";
};
