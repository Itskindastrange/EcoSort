# -*- coding: utf-8 -*-
"""Ecosort_v2_final.ipynb

Automatically generated by Colab.

Original file is located at
    https://colab.research.google.com/drive/1OyzGbQB0v2JV6O-on9ujSn-Wqd3IEOLR

#Multi-class Image classification

1. Become one with the data
2. Preprocess the data (get it ready for a model)
3. Create a model (start with a baseline)
4. Fit the mode (overfit it to make sure it works)
5. Evaluate the model
6. Adjust different hyperparameters and improve the model (try to beat baseline/reduce overfitting)
"""

from google.colab import drive
drive.mount('/content/drive')

import zipfile
import pickle
#Unzip our data
zip_ref = zipfile.ZipFile("/content/drive/MyDrive/garbage_classification.zip","r")
zip_ref.extractall()
zip_ref.close()

import os

#Walk through 12 classes of garbage image data
for dirpath,dirnames,filenames in os.walk("/content/garbage_classification"):
    print(f"There are {len(dirnames)} directories and {len(filenames)} images in '{dirpath}'.")

!ls -la /content/garbage_classification

#Setup the train and test directories
train_dir = "/content/garbage_classification/train/"
test_dir = "/content/garbage_classification/test/"

#Let's get class names
import pathlib
import numpy as np
data_dir = pathlib.Path(train_dir)
class_names = np.array(sorted([item.name for item in data_dir.glob('*')]))
print(class_names)

#Let's visualize our images
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import random

def view_random_image(target_dir,target_class):
  #Setup the target directory (we'll view images from here)
  target_folder = target_dir + target_class

  #Get a random image path
  random_image= random.sample(os.listdir(target_folder), 1)
  print(random_image)

  #Read in the image and plot it using matplotlib
  img = mpimg.imread(target_folder + "/" + random_image[0])
  plt.imshow(img)
  plt.title(target_class)
  plt.axis("off")

  print(f"Image shape: {img.shape}") #show the shape of the image

  return img

#Visualize,visualize , visualize
import random
img = view_random_image(target_dir = train_dir,
                       target_class = random.choice(class_names))

random.choice(class_names)

"""# 2.Preprocess the data (prepare it for a model)"""

from tensorflow.keras.preprocessing.image import ImageDataGenerator

#Rescale
train_datagen = ImageDataGenerator(rescale=1/255.)
test_datagen = ImageDataGenerator(rescale=1/255.)

#Load data in from directories and turn it into batches
train_data = train_datagen.flow_from_directory(train_dir,
                                              target_size=(224,224),
                                              batch_size=32,
                                              class_mode="categorical")

test_data = test_datagen.flow_from_directory(test_dir,
                                            target_size = (224,224),
                                            batch_size=32,
                                            class_mode="categorical")

"""# 3. Create a model (start with a baseline)"""

import tensorflow as tf
import random
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D,MaxPool2D,Flatten,Dense,Activation

tf.random.set_seed(42)
#Create our model
model_8 = Sequential([
    Conv2D(10,3,input_shape=(224,224,3)),
    Activation(activation="relu"),
    Conv2D(10,3,activation="relu"),
    MaxPool2D(),
    Conv2D(10,3,activation="relu"),
    Conv2D(10,3,activation="relu"),
    MaxPool2D(),
    Flatten(),
    Dense(12,activation="softmax") #changed to have 12 output neurons and use the softmax activation function
])

#Compile the model
model_8.compile(loss = "categorical_crossentropy",
               optimizer = tf.keras.optimizers.Adam(),
               metrics=["accuracy"])


#Fit the model
history_8= model_8.fit(train_data,
                      epochs=5,
                      steps_per_epoch=len(train_data),
                      validation_data=test_data,
                      validation_steps=len(test_data))

len(train_data)

#Evaluate on the test data
model_8.evaluate(test_data)

#Plot the validation and training curves seperately
def plot_loss_curves(history):
  """
  Returns seperate loss curves for training and validation metrics.
  """

  loss = history.history["loss"]
  val_loss = history.history["val_loss"]

  accuracy = history.history["accuracy"]
  val_accuracy = history.history["val_accuracy"]

  epochs = range(len(history.history["loss"])) # how many epochs did we run for?

  #Plot loss
  plt.plot(epochs,loss,label="training_loss")
  plt.plot(epochs,val_loss,label="val_loss")
  plt.title("loss")
  plt.xlabel("epochs")
  plt.legend()

  #Plot accuracy
  plt.figure()
  plt.plot(epochs,accuracy,label="training_accuracy")
  plt.plot(epochs,val_accuracy,label="val_accuracy")
  plt.title("accuracy")
  plt.xlabel("epochs")
  plt.legend()

#Check out the model's loss curves

plot_loss_curves(history_8)

model_8.summary()

"""# 6.Adjust the model hyperparameters (to beat the baseline)

"""

#Simplify the model
#Remove the 2 convolution layers...

tf.random.set_seed(42)
model_9 = Sequential([
    Conv2D(10,3,activation="relu",input_shape=(224,224,3)),
    MaxPool2D(),
    Conv2D(10,3,activation="relu"),
    MaxPool2D(),
    Flatten(),
    Dense(12,activation="softmax")
])

model_9.compile(loss = "categorical_crossentropy",
               optimizer = tf.keras.optimizers.Adam(),
               metrics=["accuracy"])
#Fit the model with 2x conv layers removed
history_9 = model_9.fit(train_data,
                       epochs=5,
                       steps_per_epoch = len(train_data),
                       validation_data = test_data,
                       validation_steps=len(test_data))

model_9.summary()

#Check out the loss curves
plot_loss_curves(history_9)

"""# Try to reduce overfitting with data augmentation

"""

#Create an augmented data generator instance
train_datagen_augmented = ImageDataGenerator(rescale=1/255.,
                                            rotation_range=0.2,
                                            width_shift_range=0.2,
                                            height_shift_range=0.2,
                                            zoom_range = 0.2,
                                            horizontal_flip = True
                                             )

train_data_augmented = train_datagen_augmented.flow_from_directory(train_dir,
                                              target_size=(224,224),
                                              batch_size=32,
                                              class_mode="categorical",
                                              shuffle=True)

#Set random seed
tf.random.set_seed(42)

#Let's create another model but on augmented data
model_10 = Sequential([
    Conv2D(10,3,activation="relu",input_shape=(224,224,3)),
    MaxPool2D(),
    Conv2D(10,3,activation="relu"),
    MaxPool2D(),
    Flatten(),
    Dense(12,activation="softmax")
])


#Compile the cloned model
model_10.compile(loss="categorical_crossentropy",
                optimizer = tf.keras.optimizers.Adam(),
                metrics=["accuracy"])


#Fit the model
history_10 = model_10.fit(train_data_augmented,
                          epochs=5,
                          steps_per_epoch=len(train_data_augmented),
                          validation_data=test_data,
                          validation_steps=len(test_data))

model_8.evaluate(test_data)

model_10.evaluate(test_data)

#Check out our model trained on augmented data's loss curves
plot_loss_curves(history_10)

"""# 7. Repeat until satisfied

### Making a prediction with our trained model
"""

class_names

#View our example image
import matplotlib.image as mpimg
import matplotlib.pyplot as plt
!wget https://github.com/mrdbourke/tensorflow-deep-learning/raw/main/images/03-steak.jpeg
steak = mpimg.imread("03-steak.jpeg")
plt.imshow(steak)
plt.axis(False)

#Create a function to import and image and resize it to be able to be used with our model
def load_and_prep_image(filename,img_shape=224):
  """
  Reads an image from file name,turns it into a tensor and reshapes it
  (img_shape,img_shape,colour_channels)
  """

  #Read in the image
  img = tf.io.read_file(filename)
  #Decode the read file into a tensor
  img = tf.image.decode_image(img)
  #Resize the image
  img = tf.image.resize(img,size=[img_shape,img_shape])
  #Rescale the image
  img = img/255.
  return img

def pred_and_plot(model,filename,class_names=class_names):
  """
  Imports an image located at filename ,makes a prediction probability and indexing it on the c;ass names
  """

  #Import the target image and preprocess it
  img = load_and_prep_image(filename)

  #Make a prediction
  pred = model.predict(tf.expand_dims(img,axis=0))


  #Add in logic for multi-class
  if len(pred[0]) > 1:
    pred_class = class_names[tf.argmax(pred[0])]
  else:
    pred_class = class_names[int(tf.round(pred[0]))]


  #Plot the image and predicted class
  plt.imshow(img)
  plt.title(f"Prediction:{pred_class}")
  plt.axis(False)

#View our example image
import matplotlib.image as mpimg
import matplotlib.pyplot as plt
steak = mpimg.imread("03-steak.jpeg")
plt.imshow(steak)
plt.axis(False)

#Set random seed
tf.random.set_seed(42)

#Let's create another model but on augmented data
model_18 = Sequential([
    Conv2D(45,3,input_shape=(224,224,3),activation="relu"),
    MaxPool2D(),
    Conv2D(45,3,activation="relu"),
    MaxPool2D(),
    Conv2D(45,3,activation="relu"),
    MaxPool2D(),
    Flatten(),
    Dense(12,activation="softmax")
])


#Compile the cloned model
model_18.compile(loss="categorical_crossentropy",
                optimizer = tf.keras.optimizers.Adam(),
                metrics=["accuracy"])


#Fit the model
history_18 = model_18.fit(train_data_augmented,
                          epochs=35,
                          steps_per_epoch=len(train_data_augmented),
                          validation_data=test_data,
                          validation_steps=len(test_data))

"""# Saving and loading our model"""

#Save a model
model_18.save("ecosort_model")

# #Load in a trained model and evaluate it
# loaded_model_10 = tf.keras.models.load_model("saved_trained_model_10")
# loaded_model_10.evaluate(test_data)

#Compare our loaded model to our existing model
model_18.evaluate(test_data)

model_18.save("ecosort.h5")

# Save class names as a pickle file
with open('class_names.pkl', 'wb') as file:
    pickle.dump(class_names, file)

# Load the saved model and class names
loaded_model = tf.keras.models.load_model("ecosort_model")

# Load the class names from the pickle file
with open('class_names.pkl', 'rb') as file:
    loaded_class_names = pickle.load(file)

# Check if the loaded class names match the original class names
if (class_names == loaded_class_names).all():
    print("Class names loaded successfully.")
else:
    print("Error loading class names.")

# Check the loaded model's performance
loaded_model.evaluate(test_data)

import pandas as pd

# Convert the history.history dict to a pandas DataFrame
hist_df = pd.DataFrame(history_18.history)

# Save to json
hist_df.to_json('history_18.json')

# Or save to csv
hist_df.to_csv('history_18.csv')

!zip -r /content/ecosort_model.zip /content/ecosort_model

from google.colab import files
files.download("/content/ecosort_model.zip")

model_18.evaluate(test_data)

plot_loss_curves(history_18)

zip_file = "/content/drive/MyDrive/images.zip"
with zipfile.ZipFile(zip_file, 'r') as zip_ref:
    zip_ref.extractall("/content/images/")

def multiple_pred_and_plot(model, directory, class_names):
    """
    Imports an image located at filename, makes a prediction and plots the image with its predicted label.
    """

    # Get all the image file names from the directory
    image_files = os.listdir(directory)

    # Loop over all the images
    for image_file in image_files:

        # Full path to the image file
        filename = os.path.join(directory, image_file)

        # Import the target image and preprocess it
        img = load_and_prep_image(filename)

        # Make a prediction
        pred = model.predict(tf.expand_dims(img, axis=0))

        # Add in logic for multi-class
        if len(pred[0]) > 1:
            pred_class = class_names[tf.argmax(pred[0])]
        else:
            pred_class = class_names[int(tf.round(pred[0]))]

        # Plot the image and predicted class
        plt.figure()
        plt.imshow(img)
        plt.title(f"Prediction: {pred_class}")
        plt.axis(False)
        plt.show()

multiple_pred_and_plot(model=model_18, directory="/content/images", class_names=class_names)