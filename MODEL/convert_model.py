import tensorflow as tf

# Contoh model dengan regularizer L2
model = tf.keras.Sequential([
    tf.keras.layers.Dense(64, activation='relu', kernel_regularizer=tf.keras.regularizers.l2(0.01), input_shape=(8,)),
    tf.keras.layers.Dense(1, activation='sigmoid')
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Save model ke format Keras
model.save('model.h5')

print("Model disimpan sebagai model.h5")
