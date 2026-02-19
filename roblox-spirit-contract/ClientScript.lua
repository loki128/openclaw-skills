-- Client UI for Spirit Contract v2 - FIXED
-- Place this in StarterPlayerScripts as a LocalScript

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")
local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

-- Wait for remote event
local ContractEvent = ReplicatedStorage:WaitForChild("ContractEvent")

print("Client script starting...")

-- Create UI
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "ContractUI"
screenGui.ResetOnSpawn = false
screenGui.Parent = playerGui

-- Darken background
local backdrop = Instance.new("Frame")
backdrop.Size = UDim2.new(1, 0, 1, 0)
backdrop.BackgroundColor3 = Color3.fromRGB(0, 0, 0)
backdrop.BackgroundTransparency = 0.5
backdrop.Visible = false
backdrop.Parent = screenGui

-- Contract popup frame
local contractFrame = Instance.new("Frame")
contractFrame.Size = UDim2.new(0, 450, 0, 350)
contractFrame.Position = UDim2.new(0.5, -225, 0.5, -175)
contractFrame.BackgroundColor3 = Color3.fromRGB(15, 15, 20)
contractFrame.BorderSizePixel = 0
contractFrame.Visible = false
contractFrame.Parent = screenGui

-- Corner radius
local corner = Instance.new("UICorner")
corner.CornerRadius = UDim.new(0, 16)
corner.Parent = contractFrame

-- Glow border
local stroke = Instance.new("UIStroke")
stroke.Color = Color3.fromRGB(255, 100, 50)
stroke.Thickness = 3
stroke.Parent = contractFrame

-- Title
local title = Instance.new("TextLabel")
title.Size = UDim2.new(1, 0, 0, 50)
title.Position = UDim2.new(0, 0, 0, 15)
title.BackgroundTransparency = 1
title.Text = "SPIRIT CONTRACT"
title.TextColor3 = Color3.fromRGB(255, 255, 255)
title.Font = Enum.Font.GothamBlack
title.TextSize = 32
title.Parent = contractFrame

-- Spirit name
local spiritName = Instance.new("TextLabel")
spiritName.Size = UDim2.new(1, 0, 0, 35)
spiritName.Position = UDim2.new(0, 0, 0, 65)
spiritName.BackgroundTransparency = 1
spiritName.Text = ""
spiritName.TextColor3 = Color3.fromRGB(255, 100, 50)
spiritName.Font = Enum.Font.GothamBold
spiritName.TextSize = 26
spiritName.Parent = contractFrame

-- Element
local element = Instance.new("TextLabel")
element.Size = UDim2.new(1, 0, 0, 20)
element.Position = UDim2.new(0, 0, 0, 100)
element.BackgroundTransparency = 1
element.Text = ""
element.TextColor3 = Color3.fromRGB(180, 180, 180)
element.Font = Enum.Font.Gotham
element.TextSize = 14
element.Parent = contractFrame

-- Divider line
local divider = Instance.new("Frame")
divider.Size = UDim2.new(0.8, 0, 0, 2)
divider.Position = UDim2.new(0.1, 0, 0, 130)
divider.BackgroundColor3 = Color3.fromRGB(60, 60, 70)
divider.BorderSizePixel = 0
divider.Parent = contractFrame

-- Strength section
local strengthLabel = Instance.new("TextLabel")
strengthLabel.Size = UDim2.new(1, -60, 0, 20)
strengthLabel.Position = UDim2.new(0, 30, 0, 145)
strengthLabel.BackgroundTransparency = 1
strengthLabel.Text = "✓ STRENGTH"
strengthLabel.TextColor3 = Color3.fromRGB(100, 255, 100)
strengthLabel.Font = Enum.Font.GothamBold
strengthLabel.TextSize = 16
strengthLabel.TextXAlignment = Enum.TextXAlignment.Left
strengthLabel.Parent = contractFrame

local strengthText = Instance.new("TextLabel")
strengthText.Size = UDim2.new(1, -60, 0, 40)
strengthText.Position = UDim2.new(0, 30, 0, 168)
strengthText.BackgroundTransparency = 1
strengthText.Text = ""
strengthText.TextColor3 = Color3.fromRGB(255, 255, 255)
strengthText.Font = Enum.Font.Gotham
strengthText.TextSize = 15
strengthText.TextWrapped = true
strengthText.TextXAlignment = Enum.TextXAlignment.Left
strengthText.Parent = contractFrame

-- Drawback section
local drawbackLabel = Instance.new("TextLabel")
drawbackLabel.Size = UDim2.new(1, -60, 0, 20)
drawbackLabel.Position = UDim2.new(0, 30, 0, 215)
drawbackLabel.BackgroundTransparency = 1
drawbackLabel.Text = "✗ DRAWBACK"
drawbackLabel.TextColor3 = Color3.fromRGB(255, 80, 80)
drawbackLabel.Font = Enum.Font.GothamBold
drawbackLabel.TextSize = 16
drawbackLabel.TextXAlignment = Enum.TextXAlignment.Left
drawbackLabel.Parent = contractFrame

local drawbackText = Instance.new("TextLabel")
drawbackText.Size = UDim2.new(1, -60, 0, 40)
drawbackText.Position = UDim2.new(0, 30, 0, 238)
drawbackText.BackgroundTransparency = 1
drawbackText.Text = ""
drawbackText.TextColor3 = Color3.fromRGB(255, 255, 255)
drawbackText.Font = Enum.Font.Gotham
drawbackText.TextSize = 15
drawbackText.TextWrapped = true
drawbackText.TextXAlignment = Enum.TextXAlignment.Left
drawbackText.Parent = contractFrame

-- Accept button
local acceptBtn = Instance.new("TextButton")
acceptBtn.Size = UDim2.new(0, 170, 0, 45)
acceptBtn.Position = UDim2.new(0, 35, 1, -65)
acceptBtn.BackgroundColor3 = Color3.fromRGB(255, 100, 50)
acceptBtn.Text = "SIGN CONTRACT"
acceptBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
acceptBtn.Font = Enum.Font.GothamBlack
acceptBtn.TextSize = 16
acceptBtn.Parent = contractFrame

local acceptCorner = Instance.new("UICorner")
acceptCorner.CornerRadius = UDim.new(0, 10)
acceptCorner.Parent = acceptBtn

-- Decline button
local declineBtn = Instance.new("TextButton")
declineBtn.Size = UDim2.new(0, 170, 0, 45)
declineBtn.Position = UDim2.new(1, -205, 1, -65)
declineBtn.BackgroundColor3 = Color3.fromRGB(50, 50, 60)
declineBtn.Text = "DECLINE"
declineBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
declineBtn.Font = Enum.Font.GothamBold
declineBtn.TextSize = 16
declineBtn.Parent = contractFrame

local declineCorner = Instance.new("UICorner")
declineCorner.CornerRadius = UDim.new(0, 10)
declineCorner.Parent = declineBtn

-- Current spirit data
local currentSpirit = nil

-- Show contract UI
ContractEvent.OnClientEvent:Connect(function(spiritKey, spiritData)
	print("Client received contract for: " .. tostring(spiritKey))
	
	currentSpirit = spiritKey
	
	spiritName.Text = spiritData.name:upper()
	element.Text = spiritData.element:upper() .. " ELEMENT SPIRIT"
	strengthText.Text = spiritData.strength
	drawbackText.Text = spiritData.drawback
	
	-- Update color theme
	stroke.Color = spiritData.color
	spiritName.TextColor3 = spiritData.color
	acceptBtn.BackgroundColor3 = spiritData.color
	
	backdrop.Visible = true
	contractFrame.Visible = true
	
	print("UI should be visible now")
end)

-- Handle accept
acceptBtn.MouseButton1Click:Connect(function()
	print("Accept button clicked, spirit: " .. tostring(currentSpirit))
	if currentSpirit then
		ContractEvent:FireServer(currentSpirit, true)
		backdrop.Visible = false
		contractFrame.Visible = false
		
		-- Show success notification
		local notif = Instance.new("Frame")
		notif.Size = UDim2.new(0, 350, 0, 80)
		notif.Position = UDim2.new(0.5, -175, 0, -100)
		notif.BackgroundColor3 = Color3.fromRGB(20, 30, 20)
		notif.BorderSizePixel = 0
		notif.Parent = screenGui
		
		local notifCorner = Instance.new("UICorner")
		notifCorner.CornerRadius = UDim.new(0, 12)
		notifCorner.Parent = notif
		
		local notifStroke = Instance.new("UIStroke")
		notifStroke.Color = Color3.fromRGB(100, 255, 100)
		notifStroke.Thickness = 2
		notifStroke.Parent = notif
		
		local notifText = Instance.new("TextLabel")
		notifText.Size = UDim2.new(1, -20, 1, -20)
		notifText.Position = UDim2.new(0, 10, 0, 10)
		notifText.BackgroundTransparency = 1
		notifText.Text = "CONTRACT SIGNED!\nCheck your backpack for your ability"
		notifText.TextColor3 = Color3.fromRGB(100, 255, 100)
		notifText.Font = Enum.Font.GothamBold
		notifText.TextSize = 18
		notifText.TextWrapped = true
		notifText.Parent = notif
		
		-- Slide in animation
		notif.Position = UDim2.new(0.5, -175, 0, -100)
		wait()
		notif.Position = UDim2.new(0.5, -175, 0, 20)
		
		wait(3)
		notif:Destroy()
	end
end)

-- Handle decline
declineBtn.MouseButton1Click:Connect(function()
	print("Decline button clicked")
	backdrop.Visible = false
	contractFrame.Visible = false
	currentSpirit = nil
end)

print("Client script loaded successfully!")