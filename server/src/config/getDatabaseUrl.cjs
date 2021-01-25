const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://postgres:postgres@localhost:5432/launch31-group-project_development",
      test: "postgres://postgres:postgres@localhost:5432/launch31-group-project_test",
      e2e: "postgres://postgres:postgres@localhost:5432/launch31-group-project_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;
