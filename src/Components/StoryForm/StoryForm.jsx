import React, { useState } from 'react'
import "./StoryForm.css";

const StoryForm = (props) => {
    console.log(props, "key");
    const [category, setCategory] = useState("");
    return (
        <div className='StoryForm'>

            <div className='storyfield'>
                <h3>Heading:</h3>
                <input type="text" placeholder="Your Heading" required name='Heading' value={props.storyprops.Heading} onChange={props.storyHandler}></input>
            </div>
            <div className='storyfield'>
                <h3>Description:</h3>
                <textarea className='description' type="text" placeholder="Description" required name='Description' value={props.storyprops.Description} onChange={props.storyHandler}></textarea>
            </div>
            <div className='storyfield'>
                <h3>Image:</h3>
                <input type="text" placeholder="Image URL" name='Image' required value={props.storyprops.Image} onChange={props.storyHandler}></input>
            </div>
            <div className='storyfield category'>
                <h3>Category:</h3>

                <div className='ulcategory'>
                    <input placeholder="Select Category" name='Category' required value={category} ></input>

                    {props.currentslide > 0 ? <></> : <ul className='categorylist'>
                        {/* <li onClick={()=>{setCategory("food"); props.setStory(prevStory => ({ ...prevStory, Category: category }));let name='Category' ;let value={category}; {props.storyHandler}}}>food</li> */}
                        <li onClick={() => {
                            setCategory("food");
                            props.setStory(prevStory => ({ ...prevStory, Category: "food" }));
                            props.storyHandler({ target: { name: 'Category', value: "food" } });
                        }}>
                            food
                        </li>
                        <li onClick={() => { setCategory("health and fitness"); props.setStory(prevStory => ({ ...prevStory, Category: category })); props.storyHandler({ target: { name: 'Category', value: "health and fitness" } }); }}>health and fitness</li>
                        <li onClick={() => { setCategory("travel"); props.setStory(prevStory => ({ ...prevStory, Category: category })); props.storyHandler({ target: { name: 'Category', value: "travel" } }); }}>travel</li>
                        <li onClick={() => { setCategory("movies"); props.setStory(prevStory => ({ ...prevStory, Category: category })); props.storyHandler({ target: { name: 'Category', value: "movies" } }); }}>movies</li>
                        <li onClick={() => { setCategory("education"); props.setStory(prevStory => ({ ...prevStory, Category: category })); props.storyHandler({ target: { name: 'Category', value: "education" } }); }}>education</li>
                    </ul>}
                </div>

            </div>

        </div>
    )
}

export default StoryForm
// import React from 'react';
// import "./StoryForm.css";

// const StoryForm = (props) => {
//   const { storyprops, storyHandler } = props;

//   return (
//     <div className='StoryForm'>
//       <div className='storyfield'>
//         <h3>Heading:</h3>
//         <input 
//           type="text" 
//           placeholder="Your Heading" 
//           name='Heading' 
//           value={story.storyprops        onChange={storyHandler} 
//         />
//       </div>
//       <div className='storyfield'>
//         <h3>Description:</h3>
//         <input 
//           className='description' 
//           type="text" 
//           placeholder="Description" 
//           name='Description' 
//           value={story.storyprops/           onChange={storyHandler} 
//         />
//       </div>
//       <div className='storyfield'>
//         <h3>Image:</h3>
//         <input 
//           type="text" 
//           placeholder="Image URL" 
//           name='Image' 
//           value={story.storyprops      onChange={storyHandler} 
//         />
//       </div>
//       <div className='storyfield'>
//         <h3>Category:</h3>
//         <input 
//           type="text" 
//           placeholder="Select Category" 
//           name='Category' 
//           value={story.storyprops         onChange={storyHandler} 
//         />
//       </div>
//     </div>
//   );
// }

// export default StoryForm;

