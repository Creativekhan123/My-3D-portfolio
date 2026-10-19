import { useEffect, useRef, useState, useCallback } from 'react';
import type { InputState } from '../types/game';

interface InputManagerHook {
  inputRef: React.MutableRefObject<InputState>;
  setJoystickInput: (vector: { x: number; z: number }) => void;
  addCameraDelta: (deltaYaw: number, deltaPitch: number) => void;
  triggerInteract: () => void;
  hasTouchCapability: boolean;
  activeInputType: 'touch' | 'keyboard' | 'mouse';
}

export function useInputManager(isModalOpen: boolean): InputManagerHook {
  const [hasTouchCapability, setHasTouchCapability] = useState<boolean>(false);
  const [activeInputType, setActiveInputType] = useState<'touch' | 'keyboard' | 'mouse'>('mouse');

  const inputRef = useRef<InputState>({
    moveVector: { x: 0, z: 0 },
    cameraDelta: { yaw: 0, pitch: 0 },
    interactRequested: false,
    activeInputType: 'mouse',
    isMoving: false,
    speedMultiplier: 1.0
  });

  const keysDownRef = useRef<{ [key: string]: boolean }>({});
  const joystickVectorRef = useRef<{ x: number; z: number }>({ x: 0, z: 0 });

  // Detect touch capability dynamically
  useEffect(() => {
    const detectTouch = () => {
      const isTouch =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-expect-error legacy msMaxTouchPoints
        navigator.msMaxTouchPoints > 0;
      setHasTouchCapability(isTouch);
      if (isTouch) {
        inputRef.current.activeInputType = 'touch';
        setActiveInputType('touch');
      }
    };
    detectTouch();
  }, []);

  const updateMoveVector = useCallback(() => {
    if (isModalOpen) {
      inputRef.current.moveVector = { x: 0, z: 0 };
      inputRef.current.isMoving = false;
      return;
    }

    let kx = 0;
    let kz = 0;

    const keys = keysDownRef.current;
    if (keys['KeyW'] || keys['ArrowUp']) kz -= 1;
    if (keys['KeyS'] || keys['ArrowDown']) kz += 1;
    if (keys['KeyA'] || keys['ArrowLeft']) kx -= 1;
    if (keys['KeyD'] || keys['ArrowRight']) kx += 1;

    // Normalize keyboard vector if moving diagonally
    const kLen = Math.hypot(kx, kz);
    if (kLen > 0) {
      kx /= kLen;
      kz /= kLen;
    }

    const jx = joystickVectorRef.current.x;
    const jz = joystickVectorRef.current.z;

    // Combine keyboard and joystick with priority or additive clamp
    let finalX = 0;
    let finalZ = 0;

    if (Math.hypot(jx, jz) > 0.05) {
      finalX = jx;
      finalZ = jz;
    } else {
      finalX = kx;
      finalZ = kz;
    }

    const len = Math.hypot(finalX, finalZ);
    inputRef.current.moveVector = { x: finalX, z: finalZ };
    inputRef.current.isMoving = len > 0.05;
  }, [isModalOpen]);

  // Window keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture keys if typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.code === 'KeyE' || e.code === 'Enter') {
        inputRef.current.interactRequested = true;
      }

      if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        keysDownRef.current[e.code] = true;
        inputRef.current.activeInputType = 'keyboard';
        setActiveInputType('keyboard');
        updateMoveVector();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        keysDownRef.current[e.code] = false;
        updateMoveVector();
      }
      if (e.code === 'KeyE' || e.code === 'Enter') {
        inputRef.current.interactRequested = false;
      }
    };

    const handleBlur = () => {
      // Safely reset all inputs when window loses focus (e.g. alt-tab, notification, dialog)
      keysDownRef.current = {};
      joystickVectorRef.current = { x: 0, z: 0 };
      inputRef.current.moveVector = { x: 0, z: 0 };
      inputRef.current.isMoving = false;
      inputRef.current.interactRequested = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);
    document.addEventListener('visibilitychange', handleBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('visibilitychange', handleBlur);
    };
  }, [updateMoveVector]);

  const setJoystickInput = useCallback((vector: { x: number; z: number }) => {
    joystickVectorRef.current = vector;
    if (Math.hypot(vector.x, vector.z) > 0.01) {
      inputRef.current.activeInputType = 'touch';
      setActiveInputType('touch');
    }
    updateMoveVector();
  }, [updateMoveVector]);

  const addCameraDelta = useCallback((deltaYaw: number, deltaPitch: number) => {
    inputRef.current.cameraDelta.yaw += deltaYaw;
    inputRef.current.cameraDelta.pitch += deltaPitch;
  }, []);

  const triggerInteract = useCallback(() => {
    inputRef.current.interactRequested = true;
    // Auto-clear after one frame cycle
    setTimeout(() => {
      inputRef.current.interactRequested = false;
    }, 120);
  }, []);

  return {
    inputRef,
    setJoystickInput,
    addCameraDelta,
    triggerInteract,
    hasTouchCapability,
    activeInputType
  };
}
