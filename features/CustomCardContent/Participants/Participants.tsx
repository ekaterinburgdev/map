import React from 'react';
import { Tag } from 'sloy-ui';
import { healthStatusToType, HEALTH_STATUS_COLOR, Participant } from './Participant/Participant';
import {
    HealthStatusType,
    DTPParticipant,
    DTPVehicle,
    DTPObjectProperties,
} from './Participants.types';

import styles from './Participants.module.css';

export type ParticipantsProps = {
    participants: DTPObjectProperties['participants'];
    vehicles?: DTPObjectProperties['vehicles'];
};

export const CATEGORY_INSTEAD_OF_BRAND = ['Трамваи', 'Троллейбусы', 'Велосипеды'];
export const BUSES_CATEGORIES = ['одноэтажные', 'одноярусные'];

export function isBus(category: string) {
    return BUSES_CATEGORIES.some((busCategory) => category.toLowerCase().includes(busCategory));
}

export function getVehicleName(vehicle: DTPVehicle) {
    let car = vehicle.brand || vehicle.category;

    if (CATEGORY_INSTEAD_OF_BRAND.includes(vehicle.category)) {
        car = vehicle.category;
    }

    if (isBus(vehicle.category) && !vehicle.brand) {
        car = 'Автобус';
    }

    if (vehicle.model && !vehicle.model.toLowerCase().includes('прочие')) {
        car += ` ${vehicle.model}`;
    }

    if (vehicle.year) {
        car += `, ${vehicle.year}`;
    }

    return car;
}

export function Participants({ participants, vehicles }: ParticipantsProps) {
    return (
        <div className={styles.participants__participants}>
            <>
                {vehicles.map((vehicle, i) => {
                    const driverIndex = vehicle.participants.findIndex(
                        (participant) => participant.role === 'Водитель',
                    );

                    let driver: DTPParticipant;
                    let driverHealthStatus: HealthStatusType;

                    if (driverIndex !== -1) {
                        driver = vehicle.participants[driverIndex];
                        driverHealthStatus = healthStatusToType(driver.health_status);
                    }

                    const restParticipants = vehicle.participants.filter(
                        (participant) => participant.role !== 'Водитель',
                    );

                    const car = getVehicleName(vehicle);

                    return (
                        <div className={styles.participants__vehicle} key={i}>
                            <div className={styles.participants__driver}>
                                <div className={styles.participants__carAndStatus}>
                                    <div className={styles.participants__car}>
                                        <div className={styles.participants__carModel}>{car}</div>
                                        <div className={styles.participants__carColor}>
                                            {vehicle.color}
                                        </div>
                                    </div>
                                    {driver && (
                                        <Tag color={HEALTH_STATUS_COLOR[driverHealthStatus].color}>
                                            {driverHealthStatus}
                                        </Tag>
                                    )}
                                </div>
                                {driver && (
                                    <div className={styles.participants__driverInfo}>
                                        <Participant participant={driver} noHealthStatus />
                                    </div>
                                )}
                            </div>
                            {restParticipants.map((participant, i) => (
                                <div className={styles.participants__section} key={i}>
                                    <Participant participant={participant} />
                                </div>
                            ))}
                        </div>
                    );
                })}
                {participants.map((participant, i) => (
                    <div className={styles.participants__participant} key={i}>
                        <Participant participant={participant} />
                    </div>
                ))}
            </>
        </div>
    );
}
