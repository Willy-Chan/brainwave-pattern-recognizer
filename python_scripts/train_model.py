import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.utils import to_categorical

# Load data
file_path = 'data_collection/eeg_data.csv'
data = pd.read_csv(file_path)

# Preprocessing
data['state'] = data['state'].map({'focus': 1, 'relax': 0})  # Convert labels to binary
features = data[['attention', 'meditation']]
labels = data['state']

# Splitting the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(features, labels, test_size=0.2, random_state=42)

# Scale features
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Neural Network Model
model = Sequential()
model.add(Dense(12, input_dim=2, activation='relu'))  # Adjust the number of neurons if needed
model.add(Dense(8, activation='relu'))
model.add(Dense(1, activation='sigmoid'))

# Compile the model
model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])

# Train the model
model.fit(X_train, y_train, epochs=1000, batch_size=10)  # Adjust epochs and batch_size as needed

# Evaluate the model
_, accuracy = model.evaluate(X_test, y_test)
print(f'Accuracy: {accuracy * 100:.2f}%')

# Save the model
model.save('eeg_focus_model.h5')
