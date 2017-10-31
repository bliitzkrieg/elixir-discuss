use Mix.Config

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with brunch.io to recompile .js and .css sources.
config :discuss, Discuss.Endpoint,
  http: [port: 4000],
  debug_errors: true,
  code_reloader: true,
  check_origin: false,
  watchers: [node: ["node_modules/brunch/bin/brunch", "watch", "--stdin",
                    cd: Path.expand("../", __DIR__)]]


# Watch static and templates for browser reloading.
config :discuss, Discuss.Endpoint,
  live_reload: [
    patterns: [
      ~r{priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$},
      ~r{priv/gettext/.*(po)$},
      ~r{web/views/.*(ex)$},
      ~r{web/templates/.*(eex)$}
    ]
  ]

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development. Avoid configuring such
# in production as building large stacktraces may be expensive.
config :phoenix, :stacktrace_depth, 20

# Configure your database
# dev only: `docker run --name phoenix-postgres -e POSTGRES_USER=someuser -e POSTGRES_PASSWORD=somepassword -v pgdata:/var/lib/postgresql/data -p 127.0.0.1:5432:5432 -d postgres:alpine`
# once started use `docker start phoenix-postgres`
config :discuss, Discuss.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "someuser",
  password: "somepassword",
  database: "discuss_dev",
  hostname: "localhost",
  pool_size: 10
