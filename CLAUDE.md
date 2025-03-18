# CLAUDE.md - Jekyll Site Development Guide

## Build Commands
```bash
bundle install                     # Install dependencies
bundle exec jekyll build           # Build site
bundle exec jekyll serve           # Serve locally with auto-reload
bundle exec jekyll clean           # Remove generated files
```

## File Organization
- `_includes/` - Reusable components (header, footer)
- `_layouts/` - Page templates
- `_posts/` - Blog posts (YYYY-MM-DD-title.md)
- `_projects/` - Custom collection for projects
- `_sass/` - Modular SCSS files
- `assets/` - Static files (images, CSS, JS)
- `_data/` - YAML data files

## Style Guidelines
- **HTML**: Use semantic markup, 2-space indentation
- **CSS**: BEM-like naming, kebab-case classes
- **SCSS**: Variables in `_variables.scss`, modular architecture
- **JS**: camelCase functions, event-based patterns
- **Content**: Markdown with YAML front matter
- **Language**: Primary Bulgarian (UTF-8)

## Best Practices
- Use responsive design patterns
- Implement defensive JS coding (null checks)
- Follow Jekyll conventions for collections and permalinks
- Maintain consistent heading structure (H2 for sections)