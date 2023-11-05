# FocusGuard YOLOv5 Distracted Detection

This project utilizes YOLOv5s to detect distractions in a person, particularly focusing on whether the person is distracted from studies or using a phone. The model monitors the person through a webcam or any camera source in real-time.

## Installation

1. Install the required dependencies:

   ```bash
   !pip3 install torch torchvision torchaudio
   ```

2. Clone the YOLOv5 repository:

   ```bash
   !git clone https://github.com/ultralytics/yolov5
   !cd yolov5 && pip install -r requirements.txt
   ```

3. Install additional dependencies:

   ```bash
   !pip install pyqt5 lxml --upgrade
   !cd labelImg && pyrcc5 -o libs/resources.py resources.qrc
   ```

## Training the Model

To train the model, follow these steps:

1. Organize your dataset and create a `dataset.yaml` file. Specify the path to the dataset in the training command.

2. Run the training command:

   ```bash
   !cd yolov5 && python train.py --img 320 --batch 16 --epochs 500 --data "C:/Users/pranshu gupta/FocusGaurd/yolov5/dataset.yaml" --weights yolov5s.pt --workers 2
   ```

## Inference

1. Load the trained model:

   ```python
   import torch
   model = torch.hub.load('ultralytics/yolov5', 'custom', path='yolov5/runs/train/exp15/weights/last.pt', force_reload=True)
   ```

2. Make predictions on an image:

   ```python
   img = os.path.join('data', 'images', 'focused.c9a24d48-e1f6-11eb-bbef-5cf3709bbcc6.jpg')
   results = model(img)
   results.print()
   ```

## Real-time Detection

1. Run the real-time detection script:

   ```python
   import cv2
   cap = cv2.VideoCapture(0)
   while cap.isOpened():
       ret, frame = cap.read()
       
       # Make detections 
       results = model(frame)
       
       cv2.imshow('YOLO', np.squeeze(results.render()))
       
       if cv2.waitKey(10) & 0xFF == ord('q'):
           break
   cap.release()
   cv2.destroyAllWindows()
   ```

This script captures video from the webcam and displays real-time detections. Press 'q' to exit the application.

## Deployment with Streamlit on MERN Stack Website

For deploying the YOLOv5 distracted detection model on your MERN stack website, you can integrate the Streamlit app. Use the `streamlit_app.py` file for the Streamlit deployment script.

1. Run the Streamlit app:

   ```bash
   !streamlit run streamlit_app.py
   ```

2. Integrate Streamlit into your MERN stack website by embedding it in an iframe or linking to the Streamlit app's URL.

Now, users visiting your MERN stack website can access the distracted detection functionality powered by YOLOv5 through the integrated Streamlit app. Customize the integration based on your website's design and requirements.
