# LockBoxApp

## Link to github: [https://github.com/yaroslav-dyn/lemon_check_next]()
## Link to app:    [https://lockboxapp.com/]()

LockBoxApp is a modern web application designed to provide secure and efficient tools for password management, encryption, and various utility features. Built with Next.js, it focuses on client-side security, ensuring sensitive data is processed locally on the user's device without being transmitted to external servers.

## Key Features

- **Password Generator** – Create secure passwords with customizable options.
- **Encryption Tools** – Encrypt and decrypt sensitive data locally.
- **IP Geolocation Checker** – Retrieve detailed location info for any IP or domain.
- **Image Tools** – Convert images to Base64 and add watermarks.
- **QR Code Generator** – Generate QR codes quickly and efficiently.
- **IndexedDB Storage (Experimental)** – Save encrypted passwords securely on your local device.
- **Text Formatter** – Online text formatter and converter. Format, clean, and transform your text with ease.

## Technology

LockBoxApp is built with [Next.js](https://nextjs.org/) delivering a fast, PWA-ready experience. The app is deployed on Cloudflare for optimized performance and reliability.

## Getting Started

To get started with development, first clone the repository and install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Running the Development Server

Start the development server with:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

The app supports hot-reloading, so changes you make will automatically update the page.

### Building for Production

To build the application for production, run:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

This will create an optimized production build in the `.next` directory.

To start the production server locally after building, run:

```bash
npm start
# or
yarn start
# or
pnpm start
```

## Deployment

LockBoxApp is deployed on Cloudflare, leveraging its global CDN and edge network for fast and reliable delivery.

## Learn More

To learn more about Next.js, visit the [Next.js Documentation](https://nextjs.org/docs).

## License

This project is licensed under the MIT License.
