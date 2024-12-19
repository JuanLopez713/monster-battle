import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { MonsterForm } from './MonsterForm';
import { MonsterUIList } from './MonsterVerticalList';
import { Header } from './HomePageHeader';
import { db } from '../firebase/config';

const initialFormState = {
  playerTag: '',
  monsterName: '',
  type: 'FIRE',
  monsterIcon: '🦁',
  health: '',
  attack: '',
  defense: '',
  speed: '',
  regularAbilityName: '',
  regularAbilityPower: '',
  specialAbilityName: '',
  specialAbilityPower: ''
};

const MonsterBattleUI = () => {
  const navigate = useNavigate();
  const [monsters, setMonsters] = useState([]);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    loadMonsters();
  }, []);

  const loadMonsters = async () => {
    try {
      const monstersCollection = collection(db, 'monsters');
      const monsterSnapshot = await getDocs(monstersCollection);
      const monsterList = monsterSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMonsters(monsterList);
    } catch (error) {
      setMessage('Error loading monsters: ' + error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (['health', 'attack', 'defense', 'speed', 'regularAbilityPower', 'specialAbilityPower'].includes(name)) {
      const processedValue = value.replace(/^0+/, '');
      if (processedValue === '' || /^\d+$/.test(processedValue)) {
        setFormData(prev => ({
          ...prev,
          [name]: processedValue
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    if (!/^[A-Za-z]{3}$/.test(formData.playerTag)) {
      setMessage('Player tag must be exactly 3 letters');
      return false;
    }
  
    const stats = {
      health: parseInt(formData.health) || 0,
      attack: parseInt(formData.attack) || 0,
      defense: parseInt(formData.defense) || 0,
      speed: parseInt(formData.speed) || 0
    };
    
    const totalStats = Object.values(stats).reduce((sum, stat) => sum + stat, 0);
    
    if (totalStats !== 255) {
      setMessage('Total stats must equal 255 (currently: ' + totalStats + ')');
      return false;
    }
  
    const regularPower = parseInt(formData.regularAbilityPower) || 0;
    const specialPower = parseInt(formData.specialAbilityPower) || 0;
  
    if (regularPower > 120) {
      setMessage('Regular ability power cannot exceed 120');
      return false;
    }
    if (specialPower > 200) {
      setMessage('Special ability power cannot exceed 200');
      return false;
    }
  
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const minRegularCost = 20;
      const minSpecialCost = 40;
      
      const regularPower = parseInt(formData.regularAbilityPower) || 0;
      const specialPower = parseInt(formData.specialAbilityPower) || 0;
      
      const regularCost = Math.max(minRegularCost, Math.floor((regularPower / 120) * 50));
      const specialCost = Math.max(minSpecialCost, Math.floor((specialPower / 200) * 90));

      // Create a clean monster object
      const monsterData = {
        playerTag: formData.playerTag.toUpperCase(),
        monsterName: formData.monsterName,
        type: formData.type,
        monsterIcon: formData.monsterIcon,
        stats: {
          health: parseInt(formData.health),
          attack: parseInt(formData.attack),
          defense: parseInt(formData.defense),
          speed: parseInt(formData.speed)
        },
        abilities: {
          regular: {
            name: formData.regularAbilityName,
            power: parseInt(formData.regularAbilityPower) || 0,
            energyCost: regularCost
          },
          special: {
            name: formData.specialAbilityName,
            power: parseInt(formData.specialAbilityPower) || 0,
            energyCost: specialCost
          }
        },
        createdAt: new Date().toISOString(),
        wins: 0  // Add initial wins count
      };

      // Validate that all required fields have values
      if (!monsterData.playerTag || !monsterData.monsterName) {
        setMessage('Player tag and monster name are required');
        return;
      }

      // Add the document to Firestore
      const monstersRef = collection(db, 'monsters');
      await addDoc(monstersRef, monsterData);

      setMessage('Monster created successfully!');
      loadMonsters();
      setFormData(initialFormState);
    } catch (error) {
      console.error('Error creating monster:', error);
      setMessage('Error creating monster: ' + error.message);
    }
  };



  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <Header onBattleClick={() => navigate('/battle')} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MonsterForm 
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            message={message}
          />
          
          <MonsterUIList monsters={monsters} />
        </div>
      </div>
    </div>
  );
};

export default MonsterBattleUI;