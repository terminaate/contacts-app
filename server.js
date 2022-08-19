const jsonServer = require('json-server');
const auth = require('json-server-auth');
const middlewares = jsonServer.defaults();
const app = jsonServer.create();
const router = jsonServer.router('db.json');

app.db = router.db;

const rules = auth.rewriter({
	// Permission rules
	users: 600,
	contacts: 640
});

app.use(middlewares)
app.use(rules);
app.use(auth);
app.use(router);

app.listen(8080, () => console.log('LISTENED'));