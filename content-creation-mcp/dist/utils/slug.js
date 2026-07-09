export function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}
export function generateUniqueFilename(baseSlug, existingFiles) {
    if (!existingFiles.includes(`${baseSlug}.md`)) {
        return `${baseSlug}.md`;
    }
    let counter = 1;
    while (existingFiles.includes(`${baseSlug}-${counter}.md`)) {
        counter++;
    }
    return `${baseSlug}-${counter}.md`;
}
