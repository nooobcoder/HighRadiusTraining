## Generating Pickle/Savepoint for notebook

```python
import pickle

model.fit(X_train, Y_train)
# Save the model to disk
filename = 'model.sav'
pickle.dump(model, open(filename, 'wb'))
```

### Loading the model from the pickle/save file

```python
loaded_model = pickle.load(open(filename, 'rb'))
result = loaded_model.score(X_test, Y_test)
```
