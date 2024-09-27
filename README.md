# Colocio-Twenty

![Version](https://img.shields.io/badge/version-0.0.3-blue.svg) ![License](https://img.shields.io/badge/license-UNLICENSED-red.svg)

Colocio is an AI-driven media buying SaaS solution aimed at simplifying and
enhancing the process of creating ad campaigns across platforms like Facebook
and Instagram. By integrating the power of AI, specifically LLM models similar
to GPT, Colocio aims to offer insights and guidance throughout the ad creation
process, making it easy for users without marketing expertise.

## Table of Contents

- [Colocio-Twenty](#colocio-twenty)
- [Project setup](#project-setup)
  - [general dependencies](#general-dependencies)
  - [Supabase](#supabase-additional)
    - [local SSL configuration](#local-ssl-configuration)
    - [linking to remote environments](#linking-to-remote-optional)
    - [TypeScript support](#schema-generation)
- [Project start](#project-start)
- [Reporting Bugs](#reporting-bugs)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Project setup

Following is necessary in order to start the project locally.

1. Clone the repository: `git clone https://gitlab.com/colocio/colocio-twenty.git`
1. Dependencies installation
1. DB sync & schema generation
1. Project start

### General dependencies

Make sure you have latest LTS version `node` with `TypeScript` support enabled.

1. Navigate to the directory: `cd colocio-twenty`
1. Run `npm install`

After successful package installation, proceed with installing `Supabase`
additional tools.

### Supabase additional

1. Install [Docker™](https://docs.docker.com/get-docker/) for your OS.
1. Install [`Supabase CLI`](https://supabase.com/docs/guides/cli/getting-started) for your OS.
1. Start Supabase docket image installed in previous step
1. Confirm your installation by starting Supabase instance:

   ```bash
   supabase start
   supabase stop --no-backup
   ```

   _NOTE_:
   Download process could _take a while_ when starting Supabase CLI for the
   first time. Supabase API can be reached via `localhost:54321`.

1. by default installation, Supabase Studio can be started at `http://localhost:54323`

#### Local SSL configuration

You need to generate an SSL certificate for your localhost instance. This is
needed because Facebook and Instagram only allow https connections to the Graph
API. Execute the following in terminal, you need to have `openssl` installed.

```bash
openssl req -x509 -out localhost.crt -keyout localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
  printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```

Make sure your keys are **not exposed** to the public.

#### Linking to remote (Optional)

Next step is to link your local Supabase instance to remote deployment instance.
Right now, you can link against Colocio `STAGING` or Colocio `PROD`
environments.

```bash
supabase link
```

Follow on-screen instructions and (for now) leave the DB password empty.

### Schema generation

To automatically generate `TypeScript` types for actual DB schema, you can run
this in your terminal:

```bash
supabase gen types typescript > ./types/database.d.ts
```

Checkout [official docs](https://supabase.com/docs/guides/auth/auth-helpers/sveltekit?language=ts#generate-types-from-your-database) on generating types.

> _TBD_: Make custom `npm run` script to achieve type generation from command line.

## Project start

1. Create `.env` file and add custom properties (_talk to @Sam for details_)
1. Start the development server with SSL support:

   ```bash
   npm run dev
   ```

Your application will be running on `https://localhost:5173`

### Demo user accounts

Use test user accounts if needed:

```text
demo@colocio.ai :: 12341234
demo1@colocio.ai :: 12341234
demo2@colocio.ai :: 12341234
```

## Other startup options

- `npm run dev:inspect` - Run the development server with a debugger listening
- `npm run build` - Build the application for production
- `npm run test` - Run both integration and unit tests
- `npm run check` - Check the project with Svelte Kit and TypeScript

## Reporting Bugs

Please report any bugs or issues [here](https://gitlab.com/colocio/colocio-twenty/-/issues).

## Deployment

This project will deploy to Vercel in the future. Follow Vercel's documentation
to deploy.

## Contributing

As this is an unlicensed project, collaboration is not openly available.  
Deployment URL: _TBD_

## License

This project is unlicensed. Please ensure you have the necessary permissions
before using or redistributing.
