# Bắt đầu với image Node.js chính thức
FROM node:18 AS build

# Đặt thư mục làm việc cho ứng dụng
WORKDIR /app

# Copy package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Copy toàn bộ mã nguồn của dự án vào container
COPY . .

# Build ứng dụng Next.js
RUN npm run build

# Tạo image chạy cho ứng dụng
FROM node:18-slim

# Đặt thư mục làm việc cho container
WORKDIR /app

# Copy các file cần thiết từ stage build
COPY --from=build /app ./

# Cài đặt các dependencies chỉ cần thiết cho môi trường production
RUN npm install --production

# Chạy ứng dụng Next.js
CMD ["npm", "start"]

# Mở port 3000 (port mặc định của Next.js)
EXPOSE 3000
