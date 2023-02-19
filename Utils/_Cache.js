"use strict";
const path = require("path");
const fs = require("fs-extra");
const request = require("request");
const os = require("os");

const { Files, Storages, Servers, GroupDomain } = require(`../Models`);

exports.GetStorage = async ({ storageId }) => {
  if (!storageId) return;
  let storageDir = path.join(global.dir, ".storage"),
    storageFile = path.join(storageDir, `storage-${storageId}`);
  try {
    return new Promise(async function (resolve, reject) {
      if (!fs.existsSync(storageFile)) {
        if (!fs.existsSync(storageDir)) {
          fs.mkdirSync(storageDir);
        }
        let storage = await Storages.Lists.findOne({
          where: {
            id: storageId,
          },
          attributes: ["sv_ip"],
        });

        if (!storage) reject();

        let sv_ip = storage?.sv_ip;
        fs.writeFileSync(storageFile, JSON.stringify(storage), "utf8");
        resolve(sv_ip);
      } else {
        let file_read = fs.readFileSync(storageFile, "utf8");
        let storage = JSON.parse(file_read);
        let sv_ip = storage?.sv_ip;
        resolve(sv_ip);
      }
    });
  } catch (error) {
    return;
  }
};

exports.GetServer = async ({ serverId }) => {
  if (!serverId) return;
  let serverDir = path.join(global.dir, ".storage"),
  serverFile = path.join(serverDir, `server-${serverId}`);

  try {
    return new Promise(async function (resolve, reject) {
      if (!fs.existsSync(serverFile)) {
        if (!fs.existsSync(serverDir)) {
          fs.mkdirSync(serverDir);
        }
        let server = await Servers.Lists.findOne({
          where: {
            id: serverId,
          },
          attributes: ["sv_ip"],
        });

        if (!server) reject();

        let sv_ip = server?.sv_ip;
        fs.writeFileSync(serverFile, JSON.stringify(server), "utf8");
        resolve(sv_ip);
      } else {
        let file_read = fs.readFileSync(serverFile, "utf8");
        let server = JSON.parse(file_read);
        let sv_ip = server?.sv_ip;
        resolve(sv_ip);
      }
    });
  } catch (error) {
    return;
  }
};