# Use the official nginx image as the base
FROM nginx

# Copy the index.html file to the default nginx folder
COPY index.html /usr/share/nginx/html

# Expose port 8081 for HTTP requests
EXPOSE 8081

# Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]