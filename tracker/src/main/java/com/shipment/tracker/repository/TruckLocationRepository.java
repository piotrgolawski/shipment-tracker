package com.shipment.tracker.repository;

import com.shipment.tracker.model.TruckLocation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TruckLocationRepository extends JpaRepository<TruckLocation, Long> {
}
