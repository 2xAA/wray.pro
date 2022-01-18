# wray.pro

Portfolio site, CV and blog. Check it out: http://wray.pro/

## Built With

- [Prismic](https://prismic.io/) - API-based content management system
- [Gatsby](https://www.gatsbyjs.org/) - React based framework for building websites

## Developing

Work on feature branch, squash PR into next, rebase next into main.
GitHub Actions will automatically build and deploy to GitHub pages.

### Setup

```bash
yarn
touch .env.development .env.production
echo -e "GATSBY_PRISMIC_REPO_NAME=\nPRISMIC_CUSTOM_TYPES_API_TOKEN=" | tee -a .env.development .env.production > /dev/null
```

### Local development

```bash
yarn develop
```
