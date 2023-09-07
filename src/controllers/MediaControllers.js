import Media from '../modal/Media.js'

const uploadImage = async (req, res) => {
    try {

        console.log(req.body);
        const result = new Media({
            text: req.body.text,
            imageUrl:req.body.imageUrl,
            likes: 0
        });
        await result.validate();
        await result.save();
        return res.status(201).send(result);
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
};


const getMedia = async (req, res) => {
    try {
        const media = await Media.find();
        res.status(200).json(media);
    } catch (error) {
        console.error('Error fetching media:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


const getTopMedia = async (req, res) => {
    try {
      const media = await Media.find()
        .sort({ likes: -1 }) // Sort by likes in descending order (-1)
        .limit(3); // Limit the results to three
  
      res.status(200).json(media);
    } catch (error) {
      console.error('Error fetching media:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

const likePost = async (req, res) => {
    try {
      const { id } = req.params;
      const media = await Media.findById(id);
      // Increment the likes count by 1
      media.likes += 1;
      await media.save();
  
      res.status(200).json(media);
    } catch (error) {
      console.error('Error liking media:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  

  const commentPost = async (req, res) => {
    try {
      const { id } = req.params;
      const { text } = req.body;
  
      const media = await Media.findById(id);
      if (!media) {
        return res.status(404).json({ message: 'Media not found' });
      }
  
      const newComment = {
        text,
      };
  
      media.comments.push(newComment);
      await media.save();
  
      res.status(201).json({ message: 'Comment added' });
    } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

export { uploadImage, getMedia, likePost, commentPost,getTopMedia }
