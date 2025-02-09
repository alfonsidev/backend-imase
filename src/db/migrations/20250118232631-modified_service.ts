'use strict';

import { DataTypes, QueryInterface } from 'sequelize';
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    queryInterface.addColumn('Service', 'createdAt', {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    })
  },

  async down(queryInterface: QueryInterface) {
    queryInterface.removeColumn('Service', 'createAt')
  }
};
