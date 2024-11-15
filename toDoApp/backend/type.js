const zod = require("zod");

const createToDo = zod.object({
    title: zod.string(),
    description: zod.string(),
})

const updateToDo = zod.object({
    id: zod.string(),
})

const deleteToDo = zod.object({
    id: zod.string(),
})

/**
 * 
 * body {
 *  title: String, 
 *  description: String
 * }
 * 
 * ----
 * 
 * ----
 * 
 * body{
 *  id: String
 * }
 */

module.exports = {
    createToDo: createToDo,
    updateToDo: updateToDo,
    deleteToDo: deleteToDo,
}