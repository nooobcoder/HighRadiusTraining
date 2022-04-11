FROM python:3.9.12
COPY ./FlaskService/ /opt/app
WORKDIR /opt/app
RUN python -m pip install --upgrade pip
RUN pip3 install -r requirements.txt
CMD ["python3","integration.py"]
