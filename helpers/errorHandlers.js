export function handleNotFound(req, res) {
    return res.status(404).json({ message: 'Not found' });
  }