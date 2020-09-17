exports.getPosts = (req, res ,next) => {
  res.status(200).json({ main: 'hello world' });
}

exports.postPosts = (req, res ,next) => {
  const { title } = req.body;
  res.status(201).json({id: new Date(), title });
}
