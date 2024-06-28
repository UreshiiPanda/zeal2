

FROM nginx:alpine
COPY . /usr/share/nginx/html/app2
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
