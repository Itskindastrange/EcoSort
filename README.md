## Ecosort AI Project Documentation

**Project Overview**

Ecosort AI is a project that utilizes a Convolutional Neural Network (CNN) model to classify images into twelve distinct waste material categories. These categories encompass:

* Battery
* Biological
* Brown-glass
* Cardboard
* Clothes
* Green-glass
* Metal
* Paper
* Plastic
* Shoes
* Trash
* White-glass

The project's primary objective is to streamline and enhance the waste sorting process through automation.

**Methodology**

The core of Ecosort AI lies in a CNN model adept at image classification. This model undergoes training using a dataset of labeled images, each corresponding to a specific waste category among the twelve. The dataset is meticulously divided into training and test sets.

* **Training Set:** Used to train the model, empowering it to recognize patterns within images that signify particular classes.
* **Test Set:** Employed to assess the model's performance.

The project incorporates the following steps:

1. **Image Loading and Batching:** Images are retrieved from designated directories and transformed into batches for efficient processing. This step also involves rescaling the images by a factor of 1/255 to normalize pixel values.
2. **Data Augmentation:** An augmented data generator is implemented to introduce variations within the training data. This strategy enhances the model's ability to generalize effectively to unseen data. The generator introduces random transformations, including rotation, width/height shifts, zoom, and horizontal flips.

**Results**

The CNN model underwent training for 35 epochs. The training process entails feeding the model with training data and fine-tuning its parameters to minimize loss.

**Evaluation Metrics:**

* **Loss:** Represents the discrepancy between the model's predictions and the actual labels.
* **Accuracy:** Measures the proportion of correct classifications made by the model.

The following metrics were obtained during the validation process:

* Loss: 0.7212
* Accuracy: 0.7692
* Validation Loss: 1.0031
* Validation Accuracy: 0.7166

**Tech Stack**

* **Frontend:** React
* **Machine Learning Model:** Custom CNN model (likely implemented using a framework like TensorFlow or PyTorch)




**Future Considerations**

* **Improved Model Performance:** Explore hyperparameter tuning, transfer learning from pre-trained models, or incorporating more sophisticated architectures to potentially enhance model accuracy.
* **Real-world Integration:** Develop a system that captures images from a waste sorting system and feeds them into the model for real-time classification and sorting automation.
* **Web Application Development:** Create a web interface that allows users to upload images and receive classifications from the model.

We recommend referring to the Ecosort AI Project Documentation (this file) for further details and insights into the project.
