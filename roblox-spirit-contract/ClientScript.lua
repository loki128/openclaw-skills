-- Client UI v6 - DEBUG & FIX
-- Place in StarterPlayerScripts as LocalScript

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")
local player = Players.LocalPlayer

print("=== CLIENT STARTING ===")

-- Wait for PlayerGui
local playerGui = player:WaitForChild("PlayerGui")
print("PlayerGui ready")

-- Get remotes
local ShowContract = ReplicatedStorage:WaitForChild("ShowContract")
local SignContract = ReplicatedStorage:WaitForChild("SignContract")
print("Remotes ready")

-- Create ScreenGui
local gui = Instance.new("ScreenGui")
gui.Name = "SpiritContractUI"
gui.ResetOnSpawn = false
gui.Parent = playerGui
print("ScreenGui created")

-- Backdrop
local backdrop = Instance.new("Frame")
backdrop.Name = "Backdrop"
backdrop.Size = UDim2.new(1, 0, 1, 0)
backdrop.BackgroundColor3 = Color3.fromRGB(0, 0, 0)
backdrop.BackgroundTransparency = 0.6
backdrop.Visible = false
backdrop.Parent = gui
print("Backdrop created")

-- Main frame
local frame = Instance.new("Frame")
frame.Name = "ContractFrame"
frame.Size = UDim2.new(0, 380, 0, 450)
frame.Position = UDim2.new(0.5, -190, 0.5, -225)
frame.BackgroundColor3 = Color3.fromRGB(15, 15, 20)
frame.BorderSizePixel = 0
frame.Visible = false
frame.Parent = gui

local corner = Instance.new("UICorner")
corner.CornerRadius = UDim.new(0, 12)
corner.Parent = frame

local stroke = Instance.new("UIStroke")
stroke.Color = Color3.fromRGB(255, 100, 50)
stroke.Thickness = 3
stroke.Parent = frame
print("Main frame created")

-- Title
local title = Instance.new("TextLabel")
title.Size = UDim2.new(1, 0, 0, 35)
title.Position = UDim2.new(0, 0, 0, 15)
title.BackgroundTransparency = 1
title.Text = "SPIRIT CONTRACT"
title.TextColor3 = Color3.fromRGB(255, 255, 255)
title.Font = Enum.Font.GothamBlack
title.TextSize = 26
title.Parent = frame

-- Spirit name
local nameLabel = Instance.new("TextLabel")
nameLabel.Name = "SpiritName"
nameLabel.Size = UDim2.new(1, 0, 0, 30)
nameLabel.Position = UDim2.new(0, 0, 0, 55)
nameLabel.BackgroundTransparency = 1
nameLabel.Text = "SPIRIT"
nameLabel.TextColor3 = Color3.fromRGB(255, 100, 50)
nameLabel.Font = Enum.Font.GothamBold
nameLabel.TextSize = 22
title.Parent = frame

-- Description
local desc = Instance.new("TextLabel")
desc.Name = "Description"
desc.Size = UDim2.new(1, -30, 0, 50)
desc.Position = UDim2.new(0, 15, 0, 90)
desc.BackgroundTransparency = 1
desc.Text = "Description..."
desc.TextColor3 = Color3.fromRGB(180, 180, 180)
desc.Font = Enum.Font.Gotham
desc.TextSize = 14
desc.TextWrapped = true
desc.Parent = frame

-- Strength box
local strBox = Instance.new("Frame")
strBox.Size = UDim2.new(1, -30, 0, 80)
strBox.Position = UDim2.new(0, 15, 0, 150)
strBox.BackgroundColor3 = Color3.fromRGB(20, 40, 25)
strBox.BorderSizePixel = 0
strBox.Parent = frame

local strCorner = Instance.new("UICorner")
strCorner.CornerRadius = UDim.new(0, 8)
strCorner.Parent = strBox

local strHeader = Instance.new("TextLabel")
strHeader.Size = UDim2.new(1, -10, 0, 25)
strHeader.Position = UDim2.new(0, 5, 0, 5)
strHeader.BackgroundTransparency = 1
strHeader.Text = "✓ STRENGTH"
strHeader.TextColor3 = Color3.fromRGB(100, 255, 100)
strHeader.Font = Enum.Font.GothamBold
strHeader.TextSize = 16
strHeader.TextXAlignment = Enum.TextXAlignment.Left
strHeader.Parent = strBox

local strText = Instance.new("TextLabel")
strText.Name = "StrengthText"
strText.Size = UDim2.new(1, -10, 0, 45)
strText.Position = UDim2.new(0, 5, 0, 30)
strText.BackgroundTransparency = 1
strText.Text = "Strength..."
strText.TextColor3 = Color3.fromRGB(255, 255, 255)
strText.Font = Enum.Font.Gotham
strText.TextSize = 14
strText.TextWrapped = true
strText.TextXAlignment = Enum.TextXAlignment.Left
strText.Parent = strBox

-- Drawback box
local weakBox = Instance.new("Frame")
weakBox.Size = UDim2.new(1, -30, 0, 80)
weakBox.Position = UDim2.new(0, 15, 0, 240)
weakBox.BackgroundColor3 = Color3.fromRGB(40, 20, 20)
weakBox.BorderSizePixel = 0
weakBox.Parent = frame

local weakCorner = Instance.new("UICorner")
weakCorner.CornerRadius = UDim.new(0, 8)
weakCorner.Parent = weakBox

local weakHeader = Instance.new("TextLabel")
weakHeader.Size = UDim2.new(1, -10, 0, 25)
weakHeader.Position = UDim2.new(0, 5, 0, 5)
weakHeader.BackgroundTransparency = 1
weakHeader.Text = "✗ DRAWBACK"
weakHeader.TextColor3 = Color3.fromRGB(255, 100, 100)
weakHeader.Font = Enum.Font.GothamBold
weakHeader.TextSize = 16
weakHeader.TextXAlignment = Enum.TextXAlignment.Left
weakHeader.Parent = weakBox

local weakText = Instance.new("TextLabel")
weakText.Name = "DrawbackText"
weakText.Size = UDim2.new(1, -10, 0, 45)
weakText.Position = UDim2.new(0, 5, 0, 30)
weakText.BackgroundTransparency = 1
weakText.Text = "Drawback..."
weakText.TextColor3 = Color3.fromRGB(255, 255, 255)
weakText.Font = Enum.Font.Gotham
weakText.TextSize = 14
weakText.TextWrapped = true
weakText.TextXAlignment = Enum.TextXAlignment.Left
weakText.Parent = weakBox

-- Ability
local ability = Instance.new("TextLabel")
ability.Name = "Ability"
ability.Size = UDim2.new(1, -30, 0, 25)
ability.Position = UDim2.new(0, 15, 0, 330)
ability.BackgroundTransparency = 1
ability.Text = "Ability: ..."
ability.TextColor3 = Color3.fromRGB(255, 255, 255)
ability.Font = Enum.Font.GothamBold
ability.TextSize = 16
ability.Parent = frame

-- Buttons
local signBtn = Instance.new("TextButton")
signBtn.Name = "SignBtn"
signBtn.Size = UDim2.new(0, 140, 0, 45)
signBtn.Position = UDim2.new(0, 25, 1, -60)
signBtn.BackgroundColor3 = Color3.fromRGB(255, 100, 50)
signBtn.Text = "SIGN"
signBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
signBtn.Font = Enum.Font.GothamBlack
signBtn.TextSize = 18
signBtn.Parent = frame

local signCorner = Instance.new("UICorner")
signCorner.CornerRadius = UDim.new(0, 8)
signCorner.Parent = signBtn

local declineBtn = Instance.new("TextButton")
declineBtn.Name = "DeclineBtn"
declineBtn.Size = UDim2.new(0, 140, 0, 45)
declineBtn.Position = UDim2.new(1, -165, 1, -60)
declineBtn.BackgroundColor3 = Color3.fromRGB(60, 60, 70)
declineBtn.Text = "DECLINE"
declineBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
declineBtn.Font = Enum.Font.GothamBold
declineBtn.TextSize = 16
declineBtn.Parent = frame

local declineCorner = Instance.new("UICorner")
declineCorner.CornerRadius = UDim.new(0, 8)
declineCorner.Parent = declineBtn

print("All UI elements created")

-- Current spirit
local currentSpirit = nil

-- Show UI function
local function ShowUI(spiritKey, data)
	print("=== SHOWUI CALLED ===")
	print("Spirit: " .. tostring(spiritKey))
	print("Data: " .. tostring(data))
	
	if not data then
		print("ERROR: No data received!")
		return
	end
	
	currentSpirit = spiritKey
	
	-- Update text
	nameLabel.Text = data.name:upper()
	desc.Text = data.description
	strText.Text = data.strength
	weakText.Text = data.drawback
	ability.Text = "Ability: " .. data.ability .. " (" .. data.damage .. " DMG)"
	
	-- Update colors
	stroke.Color = data.color
	signBtn.BackgroundColor3 = data.color
	nameLabel.TextColor3 = data.color
	
	-- Show
	backdrop.Visible = true
	frame.Visible = true
	
	print("UI SHOULD BE VISIBLE NOW")
end

-- Hide UI
local function HideUI()
	backdrop.Visible = false
	frame.Visible = false
	currentSpirit = nil
end

-- CRITICAL: Connect to server event
print("Connecting to ShowContract event...")

ShowContract.OnClientEvent:Connect(function(spiritKey, data)
	print("=== EVENT RECEIVED ===")
	print("spiritKey: " .. tostring(spiritKey))
	print("data type: " .. typeof(data))
	ShowUI(spiritKey, data)
end)

print("Event connected")

-- Button handlers
signBtn.MouseButton1Click:Connect(function()
	print("Sign clicked, spirit: " .. tostring(currentSpirit))
	if currentSpirit then
		SignContract:FireServer(currentSpirit)
		HideUI()
	end
end)

declineBtn.MouseButton1Click:Connect(function()
	print("Decline clicked")
	HideUI()
end)

print("=== CLIENT READY ===")
print("Walk to spirit, hold E, UI should appear")