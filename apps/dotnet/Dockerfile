FROM mcr.microsoft.com/dotnet/sdk:8.0 AS packages

WORKDIR /app

ENV DOTNET_CLI_TELEMETRY_OPTOUT=1
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=0

RUN dotnet tool install dotnet-reportgenerator-globaltool --tool-path /tools --version 5.2.1

SHELL ["/bin/sh", "-c"]

RUN mkdir -p ./weather.api/
RUN mkdir -p ./weather.test/

COPY ["./weather.api.sln", "./"]
COPY ./weather.api/weather.api.csproj ./weather.api/
COPY ./weather.test/weather.test.csproj ./weather.test/

RUN dotnet restore ./weather.api.sln

FROM packages as build

COPY ./weather.api ./weather.api/
RUN true
COPY ./weather.test ./weather.test/
RUN true

RUN dotnet build -c Release ./weather.api.sln

FROM build as test

RUN dotnet test --no-build \
                -c Release \
                --logger "trx;LogFileName=UnitTests.Results.trx" \
                --results-directory "/app/testresults" \
                --filter "TestType != EndToEnd & TestType != Integration" \
                --verbosity n \
                /p:MergeWith="/app/testresults/coverage.json" \
                /p:CollectCoverage=true \
                /p:CoverletOutputFormat="opencover" \
                /p:CoverletOutput="/app/testresults/coverage/unit" \
                /p:Exclude="[xunit.*]*%2c[*.*Tests]*%2c[*.Test.*]*" \
                ./weather.test/weather.test.csproj; exit 0; 

FROM test as publish

RUN dotnet publish "./weather.api/weather.api.csproj" \
  --no-dependencies \
  --no-restore \
  --no-build \
  --framework net8.0 \
  -c Release \
  -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS base
WORKDIR /app

RUN apk add icu-libs

SHELL ["/bin/sh", "-c"]

EXPOSE 5000

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV DOTNET_ENVIRONMENT Production

ENTRYPOINT ["dotnet", "weather.api.dll"]