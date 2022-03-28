var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
export function useFetchPeople() {
    const [people, setPeople] = useState(null);
    useEffect(function () {
        window.setTimeout(function () {
            const people = new Array(200)
                .fill(1)
                .map(() => faker.helpers.createCard())
                .map(function flattenCard(_a) {
                var { name, email, phone, username, website } = _a, card = __rest(_a, ["name", "email", "phone", "username", "website"]);
                return {
                    name,
                    email,
                    phone,
                    username,
                    website,
                    company: card.company.name,
                    city: card.address.city,
                };
            });
            setPeople(people);
        }, 0);
    }, []);
    return people;
}
