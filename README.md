# MetaTrader 5 Docker API

![Banner](https://github.com/user-attachments/assets/6b5101ea-275b-4ae4-8f65-6a4fc30f30bf)

This project provides a Dockerized MetaTrader 5 environment with a Flask API for interacting with MT5 data. It uses Wine to run MetaTrader 5 on a Linux-based system and exposes API endpoints for retrieving symbol information.

## Features

- Dockerized MetaTrader 5 environment
- Flask API for retrieving MT5 data
- Prometheus metrics for monitoring
- JSON logging for better log management
- Health check endpoint

## Prerequisites

- Docker
- Docker Compose (optional, for easier management)

## Installation

Clone this repository:

```bash
   git clone https://github.com/sesto-dev/docker-mt5-wine-vnc-python.git
   cd docker-mt5-wine-vnc-python
```

Build the Docker image using Docker Compose:

```bash
docker compose up -d --build
```

## Usage

Access the API endpoints:

- Symbol information: http://localhost:5000/symbol_info/<symbol>
- Health check: http://localhost:5000/health
- Metrics: http://localhost:5000/metrics

## API Endpoints

### Get Symbol Information

Returns information about the specified symbol.
Example response:
Health Check
Returns the health status of the application.

### Metrics

Returns Prometheus metrics for monitoring.

## Architecture

The project consists of two main components:
MetaTrader 5 running in a Wine environment
Flask API running on the host Linux system
The Flask API communicates with MetaTrader 5 running in a Wine environment, which allows interaction between the Linux environment and the Windows-based MT5.

## Development

To modify the API or add new endpoints, edit the following files:
Logging
The application uses JSON logging for better log management. Logs can be found in the container at /var/log/mt5_setup.log.

## Monitoring

Prometheus metrics are available at the /metrics endpoint. You can use these metrics to monitor the application's performance and request counts.

## License

This project is licensed under the MIT License. See the LICENSE.md file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any problems or have any questions, please open an issue in the GitHub repository.
