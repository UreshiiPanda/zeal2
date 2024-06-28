
FROM nginx:alpine

COPY ./projects /usr/share/nginx/html/app1

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
