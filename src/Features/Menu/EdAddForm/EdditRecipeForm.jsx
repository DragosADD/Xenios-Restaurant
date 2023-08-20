import { Form } from 'react-router-dom';
import Modal from '../../../UI/Modals/Modal';
import Button from '../../../UI/button/Button';
import { useState } from 'react';

export default function EdditRecipeForm(props) {
  const item = props.item;

  const [formData, setFormData] = useState({
    ingredients: item.ingredients,
    soldOut: item.soldOut,
    unitPrice: item.unitPrice,
    foodId: item.foodId,
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
          <h2 className="mb-8 mt-5 text-xl font-semibold">Eddit Recipe</h2>
          <div className="my-2 flex flex-col">
            <label>Ingredients</label>
            <textarea
              id="ingredients"
              name="ingredients"
              type="ingredients"
              rows="4"
              required
              className="bg-yellow-100"
              value={formData.ingredients}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-2 flex flex-col">
            <label>Is It Sold Out?</label>
            <select
              id="soldOut"
              type="soldOut"
              name="soldOut"
              className="bg-yellow-100"
              value={formData.soldOut}
              onChange={handleInputChange}
              required
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
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
          <input type="hidden" id="id" name="id" value={formData.foodId} />
          <input
            type="hidden"
            id="typeOfForm"
            name="typeOfForm"
            value={'editRecipe'}
          />

          <Button type="primary">Edit</Button>
          <Button type="button" onClick={props.onClose}>
            CLOSE
          </Button>
        </Form>
      </div>
    </Modal>
  );
}
