TAG := latest
IMAGE := lovr

build:
	@docker build -t ${IMAGE}:${TAG} .
dev:
	@docker-compose up
clean:
	@docker rmi $(docker images -q -f dangling=true)