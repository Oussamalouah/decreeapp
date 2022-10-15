#!/bin/bash
dotnet restore
dotnet build
dotnet publish  ~/dev/all/decree-api/src/Infrastructure.WebApi/Infrastructure.WebApi.csproj -o ~/dev/all/decree-api/publish