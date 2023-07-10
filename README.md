# Prometheus-X Catalog Registry

The Prometheus-X Catalog Registry is a REST API service designed to handle updates of reference models from the Prometheus-X Reference Models GitHub repository and synchronize them with a database. In addition, it provides support for catalog instance-defined reference models, including roles, value sharing, business models, building blocks, requirements, and more.

## Features

The Prometheus-X Catalog Registry offers the following features:

1. **Reference Model Updates**: The service automates the process of updating reference models from the Prometheus-X Reference Models GitHub repository. It ensures that the latest versions are synchronized with the database, providing up-to-date information to catalog participants and administrators.

2. **Catalog Instance-defined Reference Models**: In addition to the core reference models, the registry allows catalog participants to define their own reference models. This feature enables customization and flexibility within the data ecosystem, accommodating specific roles, value sharing mechanisms, business models, building blocks, requirements, and other related entities.

3. **REST API**: The Prometheus-X Catalog Registry is built as a RESTful API, making it easy to integrate and interact with other services or applications. Catalog participants and data ecosystem administrators can utilize the API to retrieve and create information for the registry.

## Installation

To install and run the Prometheus-X Catalog Registry, follow these steps:

1. Clone the repository from GitHub: `git clone https://github.com/prometheus-x/catalog-registry.git`
2. Navigate to the project directory: `cd catalog-registry`
3. Install the required dependencies: `npm install`
4. Configure the application by setting up the necessary environment variables. You will need to specify database connection details and other relevant settings.
5. Initialize your database by running `npm run db:init`
6. Start the application: `npm start`
7. The Prometheus-X Catalog Registry will be accessible at the specified URL.

## API Documentation

For detailed information on how to use the Prometheus-X Catalog Registry API, refer to the API documentation. The documentation provides comprehensive details on the available endpoints, request/response formats, authentication mechanisms, and examples.

You can access the API documentation at `http://your-registry-url/docs` or `http://your-registry-url/swagger` after starting the application.

## Contributing

Contributions to the Prometheus-X Catalog Registry are welcome! If you would like to contribute, please follow these steps:

1. Fork the repository on GitHub.
2. Create a new branch for your feature or bug fix.
3. Make the necessary code changes, adhering to the project's coding style and guidelines.
4. Write appropriate tests to ensure code integrity.
5. Commit your changes and push the branch to your forked repository.
6. Submit a pull request to the main repository, describing your changes in detail.

Please ensure that your contributions align with the project's coding standards, have proper test coverage, and include necessary documentation or updates to existing documentation.

## License

The Prometheus-X Catalog Registry is released under the [MIT License](LICENSE). You are free to use, modify, and distribute the software as per the terms specified in the license.

## Support

If you encounter any issues or have questions regarding the Prometheus-X Catalog Registry, feel free to open an issue on the GitHub repository. The project maintainers and community members will be happy to assist you.
