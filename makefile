###############
# Alexa Skill #
###############

# should always be a build number on Jenkins, only used when running elsewhere
NODE_VERSION=$(shell cat .nvmrc | tr -d '[[:space:]]')

BUILD_NUMBER ?= $(shell date +%j%H%M)

COMPONENT = gatherer-alexa
LAMBDA_NAME = $(COMPONENT)-$(BUILD_NUMBER).zip

clean:
	rm -rf *.zip \
	rm -rf node_modules \

build:

	echo $(NODE_VERSION)
	echo $(BUILD_NUMBER)
	echo $(LAMBDA_NAME)

	npm install --production && zip -r -q -u $(LAMBDA_NAME) *;

		##&& cp -r ./node_modules ./ && cp ./package.json ./ 