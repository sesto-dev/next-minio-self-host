# Dockerized Full-Stack Application with Traefik and MinIO

This project is a Dockerized full-stack application setup featuring a **frontend application** and **MinIO object storage**, managed with **Traefik** as a reverse proxy and TLS terminator. The setup is optimized for production environments with scalability, security, and ease of deployment in mind.

## Features

- **Frontend Application**: A Node.js-based application running in production mode.
- **MinIO**: High-performance object storage for file uploads and S3-compatible APIs.
- **Traefik**: Acts as a reverse proxy, manages HTTPS certificates with Let's Encrypt, and enforces HTTPS.
- **Environment Variables**: All sensitive configurations are stored in `.env` files for better security and flexibility.
- **Volume Persistence**: Data stored in MinIO persists through container restarts via Docker volumes.
- **Network Segmentation**: Containers communicate securely through isolated Docker networks.

---

## Prerequisites

- **Docker** and **Docker Compose** installed on your system.
- A domain name for the frontend and MinIO endpoints.
- Valid DNS records pointing to the server hosting the application.

---

## Environment Variables

Define the following variables in a `.env` file in the root directory of your project:

### General

```env
# Frontend App
FRONTEND_APP_DOMAIN=example.com

# MinIO
MINIO_ROOT_USER=admin
MINIO_ROOT_PASSWORD=33382244
MINIO_API_PORT=9000
MINIO_CONSOLE_PORT=9001

# MinIO S3 Access
MINIO_ENDPOINT=http://example.com
MINIO_ACCESS_KEY=minio
MINIO_SECRET_KEY=miniosecret
MINIO_BUCKET_NAME=boot

# Traefik
MINIO_DOMAIN=minio.example.com
MINIO_CONSOLE_DOMAIN=console.minio.example.com
```

## Services

1. Frontend Application

   Built from the Dockerfile in ./frontend/app.
   Accessible at http://${FRONTEND_APP_DOMAIN}.
   Configured with Traefik for HTTPS and custom headers.

2. MinIO

   Accessible via:
   API: http://${MINIO_DOMAIN} or https://${MINIO_DOMAIN}.
   Console: http://${MINIO_CONSOLE_DOMAIN} or https://${MINIO_CONSOLE_DOMAIN}.
   Ports bound to localhost for security (127.0.0.1).

3. Traefik

   Manages routing and TLS for all services.
   Automatically provisions and renews SSL certificates via Let's Encrypt.

## Setup and Deployment

1. Clone the Repository

git clone https://github.com/your-repo/project-name.git
cd project-name

2. Create .env File

Populate the .env file with the variables described above. 3. Start the Services

Run the following command to start all services:

docker-compose up -d

4. Verify the Deployment

   Access the frontend at https://${FRONTEND_APP_DOMAIN}.
    Access the MinIO API at https://${MINIO_DOMAIN}.
   Access the MinIO console at https://${MINIO_CONSOLE_DOMAIN}.

Persistent Data

    MinIO: The minio-data volume ensures that your uploaded files persist even after container restarts.

## Troubleshooting

### Common Issues

    Services Not Starting:
        Check the logs using docker-compose logs.
        Ensure your .env file is correctly configured.

    SSL Certificate Errors:
        Verify your DNS records and ensure the domains resolve to your server.

    MinIO Access Denied:
        Double-check MINIO_ACCESS_KEY and MINIO_SECRET_KEY.

Debugging Commands

    Restart a specific service:

docker-compose restart <service_name>

View service logs:

    docker-compose logs -f <service_name>

## Contributing

Contributions are welcome! Please follow the standard GitHub workflow:

Fork the repository.
Create a feature branch.
Submit a pull request with detailed information about your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
