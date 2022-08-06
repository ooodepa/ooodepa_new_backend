docker build \
-t pavelinnokentevichgalanin/ooodepa_backend \
--build-arg APP__HOST=http://localhost \
--build-arg APP__PORT=5000 \
--build-arg APP__JWT_SECRET=secret \
--build-arg APP__JWT_TOKEN_EXPIRES_IN=15m \
--build-arg SEQUELIZE__DIALECT=mysql \
--build-arg SEQUELIZE__LOGGING=true \
--build-arg SEQUELIZE__HOST=db \
--build-arg SEQUELIZE__USERNAME=super_secret_username \
--build-arg SEQUELIZE__PASSWORD=super_secret_password \
--build-arg SEQUELIZE__PORT=3306 \
--build-arg SEQUELIZE__DATABASE=database_development \
--build-arg SEQUELIZE__TIMEZONE=+00:00 \
--build-arg SEQUELIZE__TIMESTAMPS=true \
.
