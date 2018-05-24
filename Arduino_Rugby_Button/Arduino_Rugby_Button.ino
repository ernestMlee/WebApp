const int buttonPin = 4; //the number for the pushbutton pin (DIGITALPIN)

uint8_t    btnCnt = 1;

bool outputState = false;

void setup() {
  
  Serial.begin(9600);
  //for Push button pin
  pinMode(buttonPin, INPUT); 
  
}

void loop() {
  
  outputState |= digitalRead(buttonPin); // if pushButton is high, set outputState (low does nothing)

  // Print the output
  if (outputState)
  {
    
     switch (btnCnt++) {
      case 100:
        --btnCnt;
        outputState = false;
        break;  
    }
    
    Serial.println("1");
  }else{
    
    Serial.println("0");
    btnCnt = 0;
  }
  
  delay(100);
}
