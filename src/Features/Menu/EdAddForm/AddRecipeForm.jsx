import { Form } from 'react-router-dom';
import Modal from '../../../UI/Modals/Modal';
import Button from '../../../UI/button/Button';
import { useState } from 'react';

export default function AddRecipeForm(props) {
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    soldOut: true,
    unitPrice: '',
    imageUrl: '',
    IsOnMenu: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <Modal onClose={props.onClose}>
      <div className="ml-2 flex flex-col items-center justify-center font-medium text-cyan-950 ">
        <Form method="post" onSubmit={props.onClose}>
          <h2 className="mb-8 mt-5 text-xl font-semibold">Add a new Recipe</h2>
          <div className="my-2 flex flex-col">
            <label>Name of the Recipe</label>
            <input
              id="name"
              type="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="bg-yellow-100"
            />
          </div>
          <div className="my-2 flex flex-col">
            <label>Ingredients</label>
            <textarea
              id="ingredients"
              name="ingredients"
              type="ingredients"
              rows="4"
              required
              className="bg-yellow-100"
              onChange={handleInputChange}
            />
          </div>
          <div className="my-2 flex flex-col">
            <label>Price of Portion</label>
            <input
              id="unitPrice"
              type="unitPrice"
              step="0.01"
              name="unitPrice"
              value={formData.unitPrice}
              onChange={handleInputChange}
              required
              className="bg-yellow-100"
            />
          </div>

          <div className="my-2 flex flex-col">
            <label>Mark as sold?</label>
            <select
              id="soldOut"
              type="soldOut"
              name="soldOut"
              className="bg-yellow-100"
              onChange={handleInputChange}
              required
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className="my-2 flex flex-col">
            <label>Please put an url image of the recipe.</label>
            <input
              id="imageUrl"
              type="imageUrl"
              name="imageUrl"
              className="bg-yellow-100"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="my-2 flex flex-col">
            <label>Should it be posted on the menu?</label>
            <select
              id="IsOnMenu"
              type="IsOnMenu"
              name="IsOnMenu"
              className="bg-yellow-100"
              onChange={handleInputChange}
              required
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>

          <input
            type="hidden"
            id="typeOfForm"
            name="typeOfForm"
            value={'addRecipe'}
          />

          <Button type="primary">Add</Button>
          <Button type="button" onClick={props.onClose}>
            CLOSE
          </Button>
        </Form>
      </div>
    </Modal>
  );
}
