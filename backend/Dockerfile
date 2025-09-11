FROM golang:1.24-alpine AS builder

WORKDIR /builder

COPY go.mod go.sum ./  

RUN go mod download

COPY . .

RUN go build -o  /bin/app .

FROM alpine:3.21 AS final

COPY --from=builder /bin/app /bin/appendix

EXPOSE 8080

ENTRYPOINT ["/bin/appendix"]

