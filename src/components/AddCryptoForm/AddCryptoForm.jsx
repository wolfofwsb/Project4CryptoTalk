import { set } from "mongoose";
import { useState } from "react";
import { Form, Segment, Button } from "semantic-ui-react";

function AddCryptoForm({handleAddPost}) {

  const [caption, setCaption] = useState('');
  const [photo, setPhoto] = useState(null)

  function handleChange(e){
	setCaption(e.target.value)
  }

  function handleFileInput(e){
	setPhoto(e.target.files[0])
  }

  function handleSubmit(e){
	e.preventDefault();

	// we have to make form data because we are sending over a photo
	// to our express server
	const formData = new FormData()
	formData.append('caption', caption);
	formData.append('photo', photo)
	handleAddPost(formData)
  }

  return (
    <Segment>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Form.Input
          className="form-control"
          name="caption"
          value={caption}
          placeholder="Where to yolo today?"
          onChange={handleChange}
          required
        />
        <Form.Input
          className="form-control"
          type="file"
          name="photo"
          placeholder="upload image"
          onChange={handleFileInput}
        />
        <Button type="submit" className="btn">
          ADD CRYPTO
        </Button>
      </Form>
    </Segment>
  );
}

export default AddCryptoForm;
