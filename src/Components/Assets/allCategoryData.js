import logo from "../Assets/Mask group (1).svg"
let data=[
          {
            "id": 1,
            "name": "Healthy Salad",
            "description": "A nutritious salad packed with fresh vegetables and lean proteins.",
            "category": "food",
            "image_url":''
          },
          {
            "id": 2,
            "name": "Grilled Chicken",
            "description": "Tender grilled chicken seasoned to perfection, served with your choice of sides.",
            "category": "food",
            "image_url": "logo"
          },
          {
            "id": 3,
            "name": "Protein Smoothie",
            "description": "A delicious and filling smoothie packed with protein and nutrients.",
            "category": "food",
            "image_url": "logo"
          },
          {
            "id": 4,
            "name": "Avocado Toast",
            "description": "Creamy avocado spread on toasted whole grain bread, topped with your favorite toppings.",
            "category": "food",
            "image_url": ""
          },
          {
            "id": 5,
            "name": "Tofu Stir-Fry",
            "description": "A flavorful stir-fry dish with tofu and fresh vegetables, served over rice or noodles.",
            "category": "food",
            "image_url": ""
          },
          {
            "id": 6,
            "name": "Yoga Basics",
            "description": "Learn the fundamentals of yoga to improve flexibility and reduce stress.",
            "category": "health and fitness",
            "image_url": ""
          },
          {
            "id": 7,
            "name": "Cardio Workout",
            "description": "Get your heart pumping with an invigorating cardio workout.",
            "category": "health and fitness",
            "image_url": ""
          },
          {
            "id": 8,
            "name": "Strength Training",
            "description": "Build muscle and increase strength with targeted resistance exercises.",
            "category": "health and fitness",
            "image_url": ""
          },
          {
            "id": 9,
            "name": "Mindfulness Meditation",
            "description": "Practice mindfulness meditation to reduce stress and promote mental well-being.",
            "category": "health and fitness",
            "image_url": ""
          },
          {
            "id": 10,
            "name": "Hiking Adventure",
            "description": "Explore scenic trails and enjoy the beauty of nature on a hiking adventure.",
            "category": "health and fitness",
            "image_url": ""
          },
          {
            "id": 11,
            "name": "City Escape",
            "description": "Experience the excitement of exploring new cities and cultures.",
            "category": "travel",
            "image_url": ""
          },
          {
            "id": 12,
            "name": "Beach Vacation",
            "description": "Relax and unwind on sandy beaches with crystal-clear waters.",
            "category": "travel",
            "image_url": ""
          },
          {
            "id": 13,
            "name": "Mountain Retreat",
            "description": "Escape to the mountains for a tranquil retreat surrounded by breathtaking views.",
            "category": "travel",
            "image_url": ""
          },
          {
            "id": 14,
            "name": "Cultural Exploration",
            "description": "Immerse yourself in the rich culture and history of new destinations.",
            "category": "travel",
            "image_url": ""
          },
          {
            "id": 15,
            "name": "Road Trip Adventure",
            "description": "Hit the open road and embark on an unforgettable journey filled with adventure.",
            "category": "travel",
            "image_url": ""
          },
          {
            "id": 16,
            "name": "Classic Movie Night",
            "description": "Enjoy a timeless movie with family and friends.",
            "category": "movie",
            "image_url": ""
          },
          {
            "id": 17,
            "name": "Sci-Fi Movie Marathon",
            "description": "Immerse yourself in futuristic worlds with an epic sci-fi movie marathon.",
            "category": "movie",
            "image_url": ""
          },
          {
            "id": 18,
            "name": "Romantic Comedy",
            "description": "Laugh and cry with heartwarming romantic comedies that are perfect for date night.",
            "category": "movie",
            "image_url": ""
          },
          {
            "id": 19,
            "name": "Action-Packed Thriller",
            "description": "Hold on tight for adrenaline-pumping action and suspense in thrilling movies.",
            "category": "movie",
            "image_url": ""
          },
          {
            "id": 20,
            "name": "Animated Family Fun",
            "description": "Entertain the whole family with colorful and delightful animated movies.",
            "category": "movie",
            "image_url": ""
          },
          {
            "id": 21,
            "name": "Learn Spanish",
            "description": "Master the Spanish language with interactive lessons and practice exercises.",
            "category": "education",
            "image_url": ""
          },
          {
            "id": 22,
            "name": "Coding Bootcamp",
            "description": "Kickstart your coding journey with a comprehensive online bootcamp.",
            "category": "education",
            "image_url": ""
          },
          {
            "id": 23,
            "name": "History of Art",
            "description": "Explore the rich history of art and learn about influential artists and movements.",
            "category": "education",
            "image_url": ""
          },
          {
            "id": 24,
            "name": "Science Experiments",
            "description": "Discover the wonders of science through fun and educational experiments.",
            "category": "education",
            "image_url": ""
          },
          {
            "id": 25,
            "name": "Literature Classics",
            "description": "Dive into timeless literary classics and explore the depth of human experience.",
            "category": "education",
            "image_url": ""
          },
              {
                "id": 26,
                "name": "Vegetarian Pizza",
                "description": "Delicious pizza topped with a variety of fresh vegetables and gooey cheese.",
                "category": "food",
                "image_url": ""
              },
              {
                "id": 27,
                "name": "Quinoa Bowl",
                "description": "A hearty and nutritious quinoa bowl filled with colorful vegetables and protein.",
                "category": "food",
                "image_url": ""
              },
              {
                "id": 28,
                "name": "Smoothie Bowl",
                "description": "Enjoy a refreshing and nutritious smoothie bowl topped with fresh fruits and crunchy granola.",
                "category": "food",
                "image_url": ""
              },
              {
                "id": 29,
                "name": "Mediterranean Wrap",
                "description": "Savor the flavors of the Mediterranean with a delicious wrap filled with hummus, falafel, and fresh veggies.",
                "category": "food",
                "image_url": ""
              },
              {
                "id": 30,
                "name": "Zumba Dance Party",
                "description": "Dance your way to fitness with a high-energy Zumba dance party.",
                "category": "health and fitness",
                "image_url": ""
              },
              {
                "id": 31,
                "name": "Pilates Sculpt",
                "description": "Tone and strengthen your muscles with a Pilates sculpting workout.",
                "category": "health and fitness",
                "image_url": ""
              },
              {
                "id": 32,
                "name": "HIIT Circuit Training",
                "description": "Maximize calorie burn and improve cardiovascular fitness with a high-intensity interval training circuit.",
                "category": "health and fitness",
                "image_url": ""
              },
              {
                "id": 33,
                "name": "Outdoor Cycling Adventure",
                "description": "Explore scenic routes and enjoy the fresh air on an outdoor cycling adventure.",
                "category": "health and fitness",
                "image_url": ""
              },
              {
                "id": 34,
                "name": "Mental Health Workshop",
                "description": "Learn strategies for managing stress and improving mental well-being in a supportive workshop setting.",
                "category": "health and fitness",
                "image_url": "/"
              },
              {
                "id": 35,
                "name": "Solo Backpacking Trip",
                "description": "Embark on a soul-stirring solo backpacking trip to discover new landscapes and cultures.",
                "category": "travel",
                "image_url": ""
              },
              {
                "id": 36,
                "name": "Luxury Cruise Vacation",
                "description": "Indulge in ultimate relaxation and luxury aboard a lavish cruise ship.",
                "category": "travel",
                "image_url": ""
              },
              {
                "id": 37,
                "name": "Historical Landmarks Tour",
                "description": "Explore iconic historical landmarks and monuments with a guided tour.",
                "category": "travel",
                "image_url": ""
              },
              {
                "id": 38,
                "name": "Wildlife Safari",
                "description": "Embark on an unforgettable wildlife safari to witness majestic animals in their natural habitat.",
                "category": "travel",
                "image_url": ""
              },
              {
                "id": 39,
                "name": "Culinary Tour",
                "description": "Savor the flavors of local cuisine and culinary traditions on a guided culinary tour.",
                "category": "travel",
                "image_url": ""
              },
              {
                "id": 40,
                "name": "Superhero Movie Marathon",
                "description": "Celebrate your favorite superheroes with an action-packed movie marathon.",
                "category": "movie",
                "image_url": ""
              },
              {
                "id": 41,
                "name": "Classic Romance Films",
                "description": "Rediscover timeless romance with classic films that tug at the heartstrings.",
                "category": "movie",
                "image_url": "/movie/clas"
              },
              {
                "id": 42,
                "name": "Animated Fantasy Adventure",
                "description": "Embark on a magical journey with enchanting animated fantasy films.",
                "category": "movie",
                "image_url": ""
              },
              {
                "id": 43,
                "name": "Horror Movie Night",
                "description": "Get ready for a spine-chilling night of horror with terrifying movies.",
                "category": "movie",
                "image_url": ""
              },
              {
                "id": 44,
                "name": "Documentary Marathon",
                "description": "Expand your knowledge and perspective with thought-provoking documentary films.",
                "category": "movie",
                "image_url": ""
              },
              {
                "id": 45,
                "name": "Online Language Course",
                "description": "Master a new language at your own pace with engaging online language courses.",
                "category": "education",
                "image_url": ""
              },
              {
                "id": 46,
                "name": "Art History Masterclass",
                "description": "Deepen your understanding of art history with an expert-led masterclass.",
                "category": "education",
                "image_url": ""
              },
              {
                "id": 47,
                "name": "Science Fiction Literature",
                "description": "Explore the imaginative worlds of science fiction literature with captivating stories and concepts.",
                "category": "education",
                "image_url": ""
              },
              {
                "id": 48,
                "name": "Mathematics Fundamentals",
                "description": "Master the foundational principles of mathematics with comprehensive online courses.",
                "category": "education",
                "image_url": ""
              }
        ]
      export default data