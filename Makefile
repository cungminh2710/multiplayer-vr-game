TAG := latest
IMAGE := lovr

build:
	@docker build -t ${IMAGE}:${TAG} .
dev:
	@docker-compose up