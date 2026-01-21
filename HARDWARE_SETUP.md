# YenMozhi Live Demo - Hardware Setup Guide

## Current Live Demo Implementation

The Live Demo interface (`/demo`) is designed to provide a safe abstraction layer for connecting to and testing the YenMozhi hardware prototype. Here's how it currently works:

### Current Features

1. **Demo Mode (Simulation)**
   - Works in all browsers without hardware
   - Uses browser Speech Synthesis API for voice output
   - Simulates device connection and interaction
   - Perfect for demonstrations and testing UI

2. **Hardware Connection Support**
   - **Web Bluetooth API**: For wireless device connection
   - **Web Serial API**: For wired USB connection
   - Both require HTTPS (provided automatically by Vercel in production)
   - Browser compatibility limited (Chrome, Edge, Opera)

3. **UI Components**
   - Connection status indicators
   - Sound sample triggers (Help, Water, Pain, Yes, No)
   - Voice output playback
   - Real-time status feedback

## Hardware Setup Requirements

### Prerequisites

1. **Hardware Device**
   - YenMozhi prototype with Bluetooth or Serial communication capability
   - Firmware that implements the communication protocol

2. **Computer/Browser**
   - Chrome, Edge, or Opera browser (for Web Bluetooth/Serial)
   - HTTPS connection (required for Web APIs)
   - Local development: Use `localhost` (automatically trusted)

3. **Communication Protocol**
   - Define command structure for triggering sounds
   - Implement response handling
   - Error handling and reconnection logic

### Bluetooth Setup

#### On the Hardware Side:

1. **Configure Bluetooth Module**
   ```cpp
   // Example: ESP32 or similar Bluetooth-capable microcontroller
   // - Set device name (e.g., "YenMozhi-Device")
   // - Define service UUID
   // - Create characteristics for commands and responses
   ```

2. **Required Service UUID**
   ```
   Service UUID: [Define your custom UUID]
   Characteristic UUID (Commands): [Define UUID]
   Characteristic UUID (Responses): [Define UUID]
   ```

3. **Command Protocol**
   ```
   Sound Trigger Format:
   - Command byte: [0x01] (for example)
   - Sound ID: [1-5] (matching demo interface)
   - Terminator: [0x0A] (newline)
   
   Response Format:
   - Status: [0x00 = Success, 0x01 = Error]
   - Message: [Text response]
   ```

#### In the Code (`components/demo/LiveDemo.tsx`):

Update the `connectBluetooth` function:

```typescript
const connectBluetooth = useCallback(async () => {
  try {
    setConnectionStatus('connecting')
    
    // Replace with your actual service UUID
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: ['your-service-uuid-here'] }],
      optionalServices: ['your-service-uuid-here']
    })
    
    const server = await device.gatt?.connect()
    const service = await server?.getPrimaryService('your-service-uuid-here')
    
    // Get characteristics
    const commandChar = await service.getCharacteristic('command-characteristic-uuid')
    const responseChar = await service.getCharacteristic('response-characteristic-uuid')
    
    // Store for later use
    // Store commandChar in state or ref
    
    setConnectionStatus('connected')
    setDeviceInfo(`Connected: ${device.name || 'YenMozhi Device'}`)
    setDemoMode('hardware')
  } catch (error) {
    console.error('Bluetooth connection error:', error)
    setConnectionStatus('disconnected')
  }
}, [])
```

Update the `triggerSound` function:

```typescript
const triggerSound = useCallback(async (sound: SoundSample) => {
  if (connectionStatus !== 'connected') return
  
  // Send command to device
  const command = new Uint8Array([0x01, parseInt(sound.id), 0x0A])
  await commandChar.writeValue(command)
  
  // Listen for response (optional)
  // Handle voice output based on device response
}, [connectionStatus, commandChar])
```

### Serial Setup

#### On the Hardware Side:

1. **Configure Serial Communication**
   ```cpp
   // Example: Arduino, ESP32, or similar
   Serial.begin(9600);  // Match baud rate in code
   
   void loop() {
     if (Serial.available()) {
       // Parse incoming command
       // Trigger corresponding sound/voice output
       // Send response back
     }
   }
   ```

2. **Baud Rate**: 9600 (can be changed in code)

3. **Command Protocol** (same as Bluetooth):
   ```
   ASCII Format: "SOUND:1\n" (for sound ID 1)
   Or Binary: [0x01, 0x01, 0x0A]
   ```

#### In the Code (`components/demo/LiveDemo.tsx`):

Update the `connectSerial` function:

```typescript
const connectSerial = useCallback(async () => {
  try {
    setConnectionStatus('connecting')
    
    const port = await (navigator as any).serial.requestPort()
    await port.open({ baudRate: 9600 })
    
    // Store port for later use
    // Store port in state or ref
    
    setConnectionStatus('connected')
    setDeviceInfo('YenMozhi Device (Serial)')
    setDemoMode('hardware')
  } catch (error) {
    console.error('Serial connection error:', error)
    setConnectionStatus('disconnected')
  }
}, [])
```

Update the `triggerSound` function:

```typescript
const triggerSound = useCallback(async (sound: SoundSample) => {
  if (connectionStatus !== 'connected' || !port) return
  
  const encoder = new TextEncoder()
  const command = encoder.encode(`SOUND:${sound.id}\n`)
  
  const writer = port.writable?.getWriter()
  await writer?.write(command)
  writer?.release()
  
  // Read response if needed
}, [connectionStatus, port])
```

## Implementation Checklist

### Step 1: Define Communication Protocol
- [ ] Decide on Bluetooth vs Serial (or both)
- [ ] Define service/characteristic UUIDs (Bluetooth)
- [ ] Define command format and response format
- [ ] Document protocol specification

### Step 2: Update Hardware Firmware
- [ ] Implement Bluetooth/Serial communication
- [ ] Map sound IDs to actual device actions
- [ ] Implement voice output triggering
- [ ] Add error handling and status reporting

### Step 3: Update Web Interface
- [ ] Replace placeholder UUIDs in `LiveDemo.tsx`
- [ ] Implement actual command transmission
- [ ] Add response parsing
- [ ] Test connection flow
- [ ] Add error recovery

### Step 4: Testing
- [ ] Test Bluetooth connection (if applicable)
- [ ] Test Serial connection (if applicable)
- [ ] Verify command transmission
- [ ] Verify voice output triggering
- [ ] Test error scenarios (disconnect, invalid commands)
- [ ] Test reconnection logic

## Security Considerations

1. **HTTPS Required**: Web Bluetooth/Serial APIs only work over HTTPS
2. **User Consent**: Connection requires explicit user permission
3. **Error Handling**: Always handle connection failures gracefully
4. **Data Validation**: Validate all data received from device

## Browser Compatibility

| Browser | Web Bluetooth | Web Serial | Demo Mode |
|---------|--------------|------------|-----------|
| Chrome  | ✅ Yes       | ✅ Yes     | ✅ Yes    |
| Edge    | ✅ Yes       | ✅ Yes     | ✅ Yes    |
| Opera   | ✅ Yes       | ✅ Yes     | ✅ Yes    |
| Firefox | ❌ No        | ❌ No      | ✅ Yes    |
| Safari  | ❌ No        | ❌ No      | ✅ Yes    |

## Testing Without Hardware

The demo mode allows full UI/UX testing without hardware:
1. Click "Enable Demo Mode"
2. Test all sound samples
3. Verify voice output (browser Speech Synthesis)
4. Test UI responsiveness and animations

## Next Steps

1. **For Hardware Developers**: Implement firmware according to protocol specification
2. **For Web Developers**: Update UUIDs and command handlers in `LiveDemo.tsx`
3. **Testing**: Start with demo mode, then test with actual hardware
4. **Production**: Ensure HTTPS is enabled (Vercel provides this automatically)

## Support

For questions or issues:
- Check browser console for connection errors
- Verify device is discoverable/powered on
- Ensure correct UUIDs are used
- Test with demo mode first to verify UI works

---

**Note**: The current implementation provides the framework and UI. Actual hardware integration requires firmware development and protocol implementation as described above.

