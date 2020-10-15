// Import resolves error "ReferenceError: regeneratorRuntime is not defined". See https://github.com/babel/babel/issues/9849#issuecomment-487040428
const regeneratorRuntime = require("regenerator-runtime");

// Only runs when the server tests are run
process.env.ENVIRONMENT = "test";
