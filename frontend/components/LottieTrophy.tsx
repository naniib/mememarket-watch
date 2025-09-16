
import React from 'react';
import { Trophy } from 'lucide-react';

const LottieTrophy = () => {
    // The previous Lottie animation was causing build errors due to corrupt animation data.
    // Replaced with a static Trophy icon from lucide-react as a stable fix.
    return (
        <div style={{ width: 28, height: 28, marginRight: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Trophy className="w-6 h-6 text-yellow-400" />
        </div>
    );
};

export default LottieTrophy;